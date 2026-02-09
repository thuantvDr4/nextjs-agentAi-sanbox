// import OpenAI from "openai";

// const client = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_CLIENT_KEY});

import {mockLLMRaw_OK, mockLLMRaw_Bad, mockLLMRaw_WithText} from "@/lib/agent/llm/mockLLM";

export const callLLM = async (prompt: string) => {
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

    console.log("📨 PROMPT SENT TO LLM:\n", prompt);

    // return mockLLMRaw_OK()
    // return mockLLMRaw_WithText()
    return mockLLMRaw_Bad()
}