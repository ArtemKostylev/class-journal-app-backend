import z from 'zod'

export const getStudentListForTeacherRequestSchema = z.object({
    teacherId: z.coerce.number(),
})

export type GetStudentListForTeacherRequestDto = z.infer<typeof getStudentListForTeacherRequestSchema>
