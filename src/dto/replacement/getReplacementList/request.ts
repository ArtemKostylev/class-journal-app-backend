import z from 'zod'

export const getReplacementListRequestSchema = z.object({
    year: z.number(),
    month: z.number(),
    teacherId: z.number(),
    courseId: z.number(),
})

export type GetReplacementListRequestDto = z.infer<typeof getReplacementListRequestSchema>
