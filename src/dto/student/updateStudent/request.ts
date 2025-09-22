import z from 'zod'

export const updateStudentRequestSchema = z.object({
    id: z.number(),
    name: z.string(),
    surname: z.string(),
    class: z.coerce.number(),
    program: z.string(),
    specializationId: z.number(),
})

export type UpdateStudentRequestDto = z.infer<typeof updateStudentRequestSchema>
