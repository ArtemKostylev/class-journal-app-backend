import z from 'zod'

export const updateConsultRequestSchema = z.object({
    consults: z.array(
        z.object({
            id: z.number(),
            date: z.string(),
            hours: z.number(),
            relationId: z.number(),
            year: z.number(),
        })
    ),
})

export type UpdateConsultRequestDto = z.infer<typeof updateConsultRequestSchema>
