import { z } from 'zod'

export const loginRequestSchema = z.object({
    login: z.string().min(1),
    password: z.string().min(1),
})

export type LoginRequestDto = z.infer<typeof loginRequestSchema>
