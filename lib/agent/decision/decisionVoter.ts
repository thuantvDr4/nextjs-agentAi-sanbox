import {DecisionOutput} from "@/lib/agent/decision/decision.schema";


export const decisionVoter = (decisions: DecisionOutput[]): DecisionOutput => {

    const count = new Map<string, number>()
    for (const d of decisions) {
        count.set(d.action, (count.get(d.action) ?? 0) + 1)
    }

    const winner = [...count.entries()]
        .sort((a, b) => b[1] - a?.[1])[0]

    const reason = decisions?.filter(d => d.action === winner[0])
        .map((d) => d.reason)
        .join(' | ')

    return {
        action: winner[0] as DecisionOutput['action'],
        reason: `VOTED: ${reason}`,

    };
}