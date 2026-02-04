import {handlerFetch} from "@/helper/asyncHandler";

class AgentService {
    static  async run(){
        const res = await  fetch('/api/agents',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: "Search AI agents trends 2025 and summarize",
            })
        });
        return handlerFetch(res as any)
    }
}
export const agentService =   AgentService;