import { z } from 'zod'

export const getTeacherListRequestSchema = z.object({
    offset: z.coerce.number().default(0),
    limit: z.coerce.number().default(10),
    name: z.string().optional(),
})

export type GetTeacherListRequestDto = z.infer<typeof getTeacherListRequestSchema>
