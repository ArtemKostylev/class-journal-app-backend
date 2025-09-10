import z from "zod"

export const consultListRequestSchema = z.object({
    teacherId: z.coerce.number(),
    courseId: z.coerce.number(),
    year: z.coerce.number(),
})

export type ConsultListRequestDto = z.infer<typeof consultListRequestSchema>
