import {DecisionOutput, DecisionSchema, treeifyError} from "@/lib/agent/decision/decision.schema";
import {DecisionError} from "@/lib/agent/decision/decision.error";

const extractJsonFromRaw = (raw: string): string => {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
        throw new Error("No JSON object found in LLM output");
    }
    return match[0];
};

export const parseDecision = (raw: string): DecisionOutput => {
    let json: unknown;
    console.log('::[parseDecision-raw]::', raw)
    try {
        const jsonString = extractJsonFromRaw(raw);
        json = JSON.parse(jsonString);
    } catch (e) {
        throw new DecisionError('INVALID_JSON', raw);
    }
    const result = DecisionSchema.safeParse(json);
    if (!result?.success) {
        const formattedError = treeifyError(result?.error);
        throw new DecisionError('SCHEMA_VIOLATION', formattedError);
    }

    console.log('::[parseDecision]::', result)
    return result?.data
}