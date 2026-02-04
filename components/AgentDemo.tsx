'use client'
import React from 'react'
import {agentService} from "@/services/agent.service";

const AgentDemo = () => {

    const runAgent = async()=>{
        const res = await  agentService.run()
        console.log('::[agentService]::', res)
    }
    return (
        <div className="">
            <div>Demo Agent</div>
            <button onClick={runAgent} className="cursor-pointer border px-2 py-1 rounded border-white/40">
                Run Agent
            </button>
        </div>
    )
}
export default AgentDemo
