import z from 'zod'

export const updateTeacherRequestSchema = z.object({
    id: z.number(),
    name: z.string(),
    surname: z.string(),
    parent: z.string(),
    userId: z.number().optional(),
})

export type updateTeacherRequestDto = z.infer<typeof updateTeacherRequestSchema>
