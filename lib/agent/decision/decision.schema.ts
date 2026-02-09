import {z} from 'zod'

export const DecisionSchema = z.object({
    action: z.enum(['SEARCH', 'SUMMARIZE', 'DONE']),
    reason: z.string(),
    params: z.record(z.any(), z.any()).optional(),
})

export type DecisionOutput = z.infer<typeof DecisionSchema>;

export const treeifyError = (error: any) => z.treeifyError(error)