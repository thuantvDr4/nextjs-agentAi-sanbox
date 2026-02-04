import {getMemory,  saveMemory} from "@/lib/agent/memory";
import {decideAction} from "@/lib/agent/agent";
import {searchTool, summarizeTool} from "@/lib/agent/tools";

export const runAgent =async (input:string) => {
    let step =0
    const MAX_STEP = 5;

    while(step < MAX_STEP) {
    step++;
    const memory = getMemory();
    const action = decideAction(input, memory)
        if(action === "DONE") {
            break;
        }
        if(action === "SEARCH") {
            const result = await searchTool(input)
            saveMemory({
                type : 'SEARCH_RESULT',
                content: result as string
            });
        }
        if(action === "SUMMARIZE") {
            const search = memory.find(memory => memory.type === "SEARCH_RESULT");
            if(!search) throw  new Error('No search result to summarize');
            const summary = await summarizeTool(search?.content);
            saveMemory({
                type: 'SUMMARY',
                content: summary as string
            })
        }
    }
        return getMemory()
}