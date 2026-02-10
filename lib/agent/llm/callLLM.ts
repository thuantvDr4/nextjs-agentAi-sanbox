// import OpenAI from "openai";

// const client = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_CLIENT_KEY});

import {mockLLMRaw_OK, mockLLMRaw_Bad, mockLLMRaw_WithText} from "@/lib/agent/llm/mockLLM";
import {LLMResult} from "@/types/agent";
import {estimateCost} from "@/lib/agent/llm/estimateCost";

export const callLLM = async (prompt: string): Promise<LLMResult> => {
    // const response = await client.responses?.create({
    //     model: 'gpt-3.5-turbo',
    //     temperature: 0,
    //     input: [
    //         {
    //             role: 'user',
    //             content: prompt,
    //
    //         }
    //     ]
    // });
    // return response?.output_text;

    //-----MOCK DATA
    const start = Date.now()
    const raw = await mockLLMRaw_Bad()
    const durationMs = Date.now() - start

    console.log("📨 PROMPT SENT TO LLM:\n", prompt);

    // return mockLLMRaw_OK()
    // return mockLLMRaw_WithText()
    return {
        raw,
        durationMs,
        estimatedCost: estimateCost('mock', prompt, raw)
    }
}