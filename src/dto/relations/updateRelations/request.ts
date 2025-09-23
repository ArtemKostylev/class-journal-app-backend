import { z } from 'zod'

export const updateRelationsRequestSchema = z.array(
    z.object({
        teacherId: z.coerce.number(),
        courseId: z.coerce.number(),
        studentId: z.coerce.number().optional(),
        checked: z.boolean(),
    })
)

export type UpdateRelationsRequestDto = z.infer<typeof updateRelationsRequestSchema>
