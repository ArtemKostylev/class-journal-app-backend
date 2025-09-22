import z from 'zod'

export const getStudentListRequestSchema = z.object({
    offset: z.coerce.number(),
    limit: z.coerce.number(),
    filters: z
        .object({
            name: z.string().optional(),
            surname: z.string().optional(),
            class: z.coerce.number().optional(),
            program: z.string().optional(),
            specialization: z.string().optional(),
        })
        .optional(),
})

export type GetStudentListRequestDto = z.infer<typeof getStudentListRequestSchema>
