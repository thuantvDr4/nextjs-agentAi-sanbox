// LLM:  bo nao của agent

import {MemoryItem} from "@/lib/agent/memory";

export type Action = 'SEARCH' | "SUMMARIZE" | "DONE"


export const decideAction =(input:string, memory: MemoryItem[]): Action=>{
    const hasSearch = memory.some(m=>m.type ==='SEARCH_RESULT')
    const hasSummary = memory.some(m=>m.type ==='SUMMARY')

    if(!hasSearch)return "SEARCH"
    if(!hasSummary)return "SUMMARIZE"
    return "DONE"
}