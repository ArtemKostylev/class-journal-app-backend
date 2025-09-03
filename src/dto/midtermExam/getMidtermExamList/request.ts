import z from 'zod'

export const getMidtermExamListRequestSchema = z.object({
    teacherId: z.number(),
    year: z.number(),
    typeId: z.number(),
    period: z.string(),
})

export type GetMidtermExamListRequestDto = z.infer<typeof getMidtermExamListRequestSchema>
