// LLM:  bo nao của agents
import {MemoryItem, AgentAction, DecisionInput, DecisionState} from "@/types/agent";
import {buildDecisionPrompt} from "@/lib/agent/decision/buildDecistionPrompt";
import {callLLM} from "@/lib/agent/llm/callLLM";
import {parseDecision} from "@/lib/agent/decision/decision.guard";
import {DecisionOutput} from "@/lib/agent/decision/decision.schema";
import {buildCorrectionPrompt} from "@/lib/agent/decision/decisionCorrection.prompt";
import {DecisionError} from "@/lib/agent/decision/decision.error";
import {decisionValidateLogic} from "@/lib/agent/decision/decision.validate";
import {DecisionTrace} from "@/lib/agent/trace/decision.trace";


export const decideAction = (input: string, memory: MemoryItem[]): AgentAction => {
    const hasSearch = memory.some(m => m.type === 'SEARCH_RESULT')
    const hasSummary = memory.some(m => m.type === 'SUMMARY')
    if (!hasSearch) return "SEARCH"
    if (!hasSummary) return "SUMMARIZE"
    return "DONE"
}

export const decideActionWithLLM = async (input: DecisionInput): Promise<DecisionOutput> => {
    const hasSearch = input?.memory?.some(m => m.type === 'SEARCH_RESULT');
    const hasSummary = input?.memory?.some(m => m.type === 'SUMMARY')

    if (!hasSearch) {
        return {
            action: "SEARCH",
            reason: "Chưa có dữ liệu tìm kiếm"
        }
    }
    if (!hasSummary) {
        return {
            action: 'SUMMARIZE',
            reason: 'Đã có kết quả search, cần tóm tắt'
        }
    }
    return {
        action: 'DONE',
        reason: 'Đã đủ thông tin để trả lời'
    }
}

/***
 1. tạo prompt
 2. goi toi LLM with prompt, đợi nhận raw result
 3.parse rawResult
 4. tra về kết quả
 **/
export const decideActionWithLLMByPrompt = async (state: DecisionState): Promise<DecisionOutput> => {
    const prompt = buildDecisionPrompt(state);
    const raw = await callLLM(prompt);
    return parseDecision(raw)
}

/***
 1. tạo prompt
 2. goi toi LLM with prompt, đợi nhận raw result
 3.parse rawResult
 4. tra về kết quả
 **/
const MAX_RETRY = 3;
export const decideActionPromptWithRetry = async (
    state: DecisionState,
    trace: DecisionTrace[]
): Promise<DecisionOutput> => {
    let prompt = buildDecisionPrompt(state);
    for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
        const timestamp = new Date().toISOString()
        try {
            const raw = await callLLM(prompt);
            const decision = parseDecision(raw);
            // --validate decision
            decisionValidateLogic(decision, state?.memory)

            //---for trace
            trace.push({
                step: state.currentStep,
                attempt,
                prompt,
                rawOutput: raw,
                decision,
                timestamp
            });

            return decision
        } catch (err: any) {
            //--trace error
            trace.push({
                step: state.currentStep,
                attempt,
                prompt,
                rawOutput: err?.raw ?? 'raw output',
                error: {
                    type: err?.type ?? 'UNKNOWN',
                    message: err?.message,
                    detail: err?.detail ?? 'error detail'
                },
                timestamp
            })

            if (!isDecisionError(err)) {
                throw err; // lỗi hệ thống → không sửa
            }
            if (attempt === MAX_RETRY) {
                throw err //hết lượt
            }
            prompt = buildCorrectionPrompt(prompt, err)
        }
    }
    throw new Error('Decision failed after retries')
}

export function isDecisionError(err: unknown): err is DecisionError {
    return err instanceof DecisionError
}