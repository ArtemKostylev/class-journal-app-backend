import { z } from 'zod'

export const updateTeacherCoursesRequestSchema = z.object({
    teacherId: z.number(),
    coursesToAdd: z.array(z.number()),
    coursesToRemove: z.array(z.number()),
})

export type UpdateTeacherCoursesRequestDto = z.infer<typeof updateTeacherCoursesRequestSchema>
