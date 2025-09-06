import z from 'zod'

export const getGroupConsultListRequestSchema = z.object({
    teacherId: z.number(),
    courseId: z.number(),
    year: z.number(),
})

export type GetGroupConsultListRequestDto = z.infer<typeof getGroupConsultListRequestSchema>
