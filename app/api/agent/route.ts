import {NextResponse} from 'next/server'
import {clearMemory} from "@/lib/agent/memory";
import {runAgent} from "@/lib/agent/runAgent";

export const POST = async (req: Request)=>{
    const {input} = await  req.json();
    clearMemory();
    const result = await runAgent(input);
    return NextResponse.json({result});
}