import { z } from "zod";

export const updateSpecializationRequestSchema = z.object({
    id: z.number(),
    name: z.string(),
})

export type UpdateSpecializationRequestDto = z.infer<typeof updateSpecializationRequestSchema>