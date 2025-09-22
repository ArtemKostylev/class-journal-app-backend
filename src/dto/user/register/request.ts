import z from 'zod'

export type RegisterRequestDto = z.infer<typeof registerRequestSchema>

export const registerRequestSchema = z.object({
    login: z.string().min(1),
    password: z.string().min(1),
    role: z.coerce.number(),
})
