// Memory = trí nhớ | kien thuc
export type MemoryItem  ={
    type: "SEARCH_RESULT" | "SUMMARY";
    content: string
}

const memory: MemoryItem[] = [];

export function saveMemory(memoryItem: MemoryItem) {
    return memory.push(memoryItem)
}
export const getMemory = ():Promise<MemoryItem[]> => {
    return new Promise((resolve, reject) => {
        resolve(memory)
    });
}

export const clearMemory = () => {
    memory.length =0
}