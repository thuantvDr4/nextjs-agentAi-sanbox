import {handlerFetch} from "@/helper/asyncHandler";
import {logRequest} from "@/services/logger.service";

class AgentService {
    static async run(input: string) {
        const url = '/api/agents';
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({input})
        };
        logRequest({url, ...options});
        const res = await fetch(url, options);
        return handlerFetch(res as any)
    }
}

export const agentService = AgentService;