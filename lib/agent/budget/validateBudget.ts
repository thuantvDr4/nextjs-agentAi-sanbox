import {AgentBudget, AgentUsage} from "@/lib/agent/budget/agent.budget";
import {DecisionError} from "@/lib/agent/decision/decision.error";

export const validateBudget = (usage: AgentUsage, budget: AgentBudget) => {
    if (usage.totalMs > budget.maxTotalMs) {
        throw new DecisionError('BUDGET_EXCEEDED', 'Total latency budget exceeded')
    }
    if (usage.llmCalls > budget.maxLLMCalls) {
        throw new DecisionError('BUDGET_EXCEEDED',
            'LLM call limit exceeded')
    }
    if (usage.estimatedCost > budget.maxEstimatedCost) {
        throw new DecisionError('BUDGET_EXCEEDED',
            'Cost budget exceeded')
    }
}