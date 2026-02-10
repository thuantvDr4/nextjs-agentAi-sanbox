export type  AgentStep = {
    step: number;
    action: AgentAction
    description?: string;
    timestamp: string;
    durationMs: number;
    decisionMs: number;
    reason: string
};

export type AgentAction = 'SEARCH' | "SUMMARIZE" | "DONE"

export type DecisionInput = {
    goal: string;
    memory: MemoryItem[];
    steps: AgentStep[]
}


export type MemoryItem = {
    type: "SEARCH_RESULT" | "SUMMARY";
    content: string
}

export type DecisionState = {
    goal: string
    currentStep: number
    maxSteps: number
    memory: MemoryItem[];
    previousActions: AgentAction[]
}

export type DecisionErrorType = "INVALID_JSON" | "SCHEMA_VIOLATION" | "LOGIC_ERROR" | "BUDGET_EXCEEDED"

export interface LLMResult {
    raw: string
    durationMs: number
    estimatedCost: number
}