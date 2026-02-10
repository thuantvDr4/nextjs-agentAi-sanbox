export interface AgentBudget {
    maxTotalMs: number;
    maxLLMCalls: number;
    maxEstimatedCost: number
}

export interface AgentUsage {
    totalMs: number;
    llmCalls: number;
    estimatedCost: number;
}
