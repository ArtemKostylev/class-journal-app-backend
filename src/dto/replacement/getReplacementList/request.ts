import z from 'zod'

export const getReplacementListRequestSchema = z.object({
    year: z.coerce.number(),
    month: z.coerce.number(),
    teacherId: z.coerce.number(),
    courseId: z.coerce.number(),
})

export type GetReplacementListRequestDto = z.infer<typeof getReplacementListRequestSchema>
