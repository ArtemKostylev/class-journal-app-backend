import z from "zod"

export const consultListRequestSchema = z.object({
    teacherId: z.number(),
    courseId: z.number(),
    year: z.number(),
})

export type ConsultListRequestDto = z.infer<typeof consultListRequestSchema>
