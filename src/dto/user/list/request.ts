import { z } from 'zod'

export const userListRequestSchema = z.object({
    offset: z.coerce.number().optional().default(0),
    limit: z.coerce.number().optional().default(10),
})

export type UserListRequestDto = z.infer<typeof userListRequestSchema>
