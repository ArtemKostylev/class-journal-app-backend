import { z } from 'zod'

export const updateCourseStudentsRequestSchema = z.object({
    relationId: z.number(),
    teacherId: z.number(),
    courseId: z.number(),
    studentsToAdd: z.array(z.number()),
    studentsToRemove: z.array(z.number()),
})

export type UpdateCourseStudentsRequestDto = z.infer<typeof updateCourseStudentsRequestSchema>
