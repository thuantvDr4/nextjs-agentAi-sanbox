export const estimateCost = (
    model: string,
    prompt: string,
    output: string) => {
    // mock data
    const token = prompt.length + output.length;
    return token * 0.000001
}