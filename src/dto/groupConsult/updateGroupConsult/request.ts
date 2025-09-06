import z from 'zod'

export const updateGroupConsultRequestSchema = z.object({
    consults: z.array(
        z.object({
            program: z.string(),
            subgroup: z.number(),
            class: z.number(),
            consultId: z.number(),
            date: z.string(),
            hours: z.number(),
            year: z.number(),
        })
    ),
    teacher: z.number(),
    course: z.number(),
})

export type UpdateGroupConsultRequestDto = z.infer<typeof updateGroupConsultRequestSchema>
