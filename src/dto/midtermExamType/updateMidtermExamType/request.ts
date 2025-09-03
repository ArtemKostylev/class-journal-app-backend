import z from 'zod'

export const updateMidtermExamTypeRequestSchema = z.object({
    id: z.number(),
    name: z.string(),
})

export type UpdateMidtermExamTypeRequestDto = z.infer<typeof updateMidtermExamTypeRequestSchema>