import {NextResponse} from 'next/server'
import {clearMemory} from "@/lib/agent/memory";
import {runAgent} from "@/lib/agent/runAgent";

export const POST = async (req: Request)=>{
   try{
       const {input=''} = await  req.json();
       if(!input){
           return NextResponse.json({
               error: "Missing input",
           },{
               status: 400,
           })
       }
       // quan trong
       clearMemory();

       const result = await runAgent(input);
       return  NextResponse.json({
           success: true,
           agent: result,
           metadata: {}
       },{status: 200})
   } catch (e:any) {
        return NextResponse.json({
            error: e?.message,
        },{status: 500})
   }
}