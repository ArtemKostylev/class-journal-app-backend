import z from 'zod'

export const deleteMidtermExamRequestSchema = z.object({
    id: z.number(),
})

export type DeleteMidtermExamRequestDto = z.infer<typeof deleteMidtermExamRequestSchema>