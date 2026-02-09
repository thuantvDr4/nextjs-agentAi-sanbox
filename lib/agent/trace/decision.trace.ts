import {DecisionOutput} from "@/types/agent";

export interface DecisionTrace {
    step: number
    attempt: number;
    prompt: string;
    rawOutput?: string;
    decision?: DecisionOutput;
    error?: {
        type: string;
        message: string;
        detail?: any
    }
    timestamp: string;
}