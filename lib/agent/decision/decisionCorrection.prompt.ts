import {DecisionError} from "@/lib/agent/decision/decision.error";
import {DecisionSchema} from "@/lib/agent/decision/decision.schema";

export const buildCorrectionPrompt = (
    prevPrompt: string,
    error: DecisionError,
) => {
    return `
    Your previous output was INVALID.

    Error type: ${error.type}
    Error detail:
    ${JSON.stringify(error.detail, null, 2)}

    Fix your output.
    Return ONLY valid JSON matching this schema:
    ${DecisionSchema.toString()}

    Previous prompt:
    ${prevPrompt}
    
    The previous decision was rejected due to a LOGIC ERROR:

    Cannot SUMMARIZE before SEARCH

    You must choose a valid action based on the agent memory.
    `
}