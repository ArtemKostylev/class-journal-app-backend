import z from 'zod'

export const getMidtermExamListRequestSchema = z.object({
    teacherId: z.coerce.number(),
    year: z.coerce.number(),
    typeId: z.coerce.number(),
    period: z.string(),
})

export type GetMidtermExamListRequestDto = z.infer<typeof getMidtermExamListRequestSchema>
