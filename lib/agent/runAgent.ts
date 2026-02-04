import {getMemory,  saveMemory} from "@/lib/agent/memory";
import {decideAction} from "@/lib/agent/agent";
import {searchTool, summarizeTool} from "@/lib/agent/tools";

type  AgentStep = {
    step: number;
    action: "SEARCH" | "SUMMARIZE" | "DONE";
    description: string;
    timestamp?: string;
    durationMs?: number | null;
    decisionMs?: number | null;
};
export const runAgent =async (input:string) => {
    let step =0
    const MAX_STEP = 5;
    const steps: AgentStep[] = []

    while(step < MAX_STEP) {
    step++;

    const memory = await getMemory();
        const decisionStart = Date.now();
        const action = decideAction(input, memory);
        const decisionMs = Date.now() - decisionStart;
        //--luu steps
        const stepLog ={
            step: step,
            action,
            description: `Agent quyêt định thực hiện hành động: ${action}`,
            timestamp: new Date().toISOString(),
            decisionMs,
        }
        steps.push(stepLog);

        // do execution
        const actionStart = Date.now();

        if(action === "DONE") {
            // save duraionMS
            steps[steps.length - 1].durationMs = null;
            break;
        }
        if(action === "SEARCH") {
            const result = await searchTool(input)
            saveMemory({
                type : 'SEARCH_RESULT',
                content: result as string
            });
        }
        if(action === "SUMMARIZE") {
            const latestMemory = await getMemory();
            const search = latestMemory.find(memory => memory.type === "SEARCH_RESULT");
            if(!search) throw  new Error('No search result to summarize');
            const summary = await summarizeTool(search?.content);
            saveMemory({
                type: 'SUMMARY',
                content: summary as string
            })
        }
        // save duraionMS
        steps[steps.length - 1].durationMs = Date.now() - actionStart;
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