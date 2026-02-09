import {DecisionOutput, MemoryItem} from "@/types/agent";
import {DecisionError} from "@/lib/agent/decision/decision.error";

export const decisionValidateLogic = (
    decision: DecisionOutput,
    memory: MemoryItem[],
) => {
    const hasSearch = memory?.some(m => m.type === "SEARCH_RESULT");
    const hasSummary = memory?.some(m => m.type === "SUMMARY");
    if (decision.action === 'SUMMARIZE' && !hasSearch) {
        throw new DecisionError('LOGIC_ERROR', 'Cannot SUMMARIZE before SEARCH');
    }

    if (decision.action === 'DONE' && !hasSummary) {
        throw new DecisionError('LOGIC_ERROR', 'Cannot DONE before SUMMARY');
    }
    
}