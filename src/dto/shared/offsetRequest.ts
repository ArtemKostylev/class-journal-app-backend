import { z } from 'zod'

export const offsetRequestSchema = z.object({
    offset: z.coerce.number(),
    limit: z.coerce.number(),
})

export type OffsetRequestDto = z.infer<typeof offsetRequestSchema>
