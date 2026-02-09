import {getMemory, saveMemory} from "@/lib/agent/memory";
import {
    decideAction,
    decideActionPromptWithRetry,
    decideActionWithLLM,
    decideActionWithLLMByPrompt
} from "@/lib/agent/agent";
import {searchTool, summarizeTool} from "@/lib/agent/tools";
import {AgentStep} from "@/types/agent";
import {DecisionTrace} from "@/lib/agent/trace/decision.trace";

export const runAgent = async (input: string) => {
    let step = 0
    const MAX_STEP = 5;
    const steps: AgentStep[] = []
    const decisionTraces: DecisionTrace[] = []

    while (step < MAX_STEP) {
        step++;

        //----------- GET MEMORY
        const memory = await getMemory();

        //------DECISION-------
        const decisionStart = Date.now();
        //--- run without LLM : LV 0
        // const action = decideAction(input, memory);

        //---run with LLM : LV 1
        // const {action, reason} = await decideActionWithLLM({
        //     goal: input,
        //     memory,
        //     steps
        // });


        // ---run LLM with retry: LV 2
        const {action, reason, params} = await decideActionPromptWithRetry({
            goal: input,
            memory,
            currentStep: step,
            maxSteps: MAX_STEP,
            previousActions: steps?.map(x => x.action)
        }, decisionTraces);

        const decisionMs = Date.now() - decisionStart;

        // ----EXECUTION--------
        const actionStart = Date.now();

        if (action === "SEARCH") {
            const result = await searchTool(input)
            saveMemory({
                type: 'SEARCH_RESULT',
                content: result as string
            });
        }

        if (action === "SUMMARIZE") {
            const latestMemory = await getMemory();
            const search = latestMemory.find(memory => memory.type === "SEARCH_RESULT");
            if (!search) throw new Error('No search result to summarize');
            const summary = await summarizeTool(search?.content);
            saveMemory({
                type: 'SUMMARY',
                content: summary as string
            })
        }
        const durationMs = Date.now() - actionStart;
        // ===== LOG STEP (IMMUTABLE) =====
        steps.push({
            step,
            action,
            reason,
            decisionMs,
            durationMs,
            timestamp: new Date().toISOString()
        });

        if (action === "DONE") {
            break; // 👈 BREAK SAU KHI STEP ĐÃ ĐẦY ĐỦ
        }
    }
    // return
    const memory = await getMemory();
    const finalAnswer = memory?.find(x => x.type === "SUMMARY")?.content ?? "";
    return {
        steps,
        memory: memory,
        finalAnswer,
    }
}