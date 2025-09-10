import z from 'zod'

export const getGroupConsultListRequestSchema = z.object({
    teacherId: z.coerce.number(),
    courseId: z.coerce.number(),
    year: z.coerce.number(),
})

export type GetGroupConsultListRequestDto = z.infer<typeof getGroupConsultListRequestSchema>
