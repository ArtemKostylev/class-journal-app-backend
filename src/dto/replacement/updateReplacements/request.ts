import { z } from 'zod'

export const updateReplacementsRequestSchema = z.array(
    z.object({
        id: z.number(),
        date: z.string(),
        journalEntryId: z.number(),
    })
)

export type UpdateReplacementsRequestDto = z.infer<typeof updateReplacementsRequestSchema>
