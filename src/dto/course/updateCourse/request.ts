import z from "zod";

export const updateCourseRequestSchema = z.object({
    id: z.number(),
    name: z.string(),
    group: z.boolean(),
    excludeFromReport: z.boolean(),
    onlyHours: z.boolean(),
    onlyGroups: z.boolean(),
})

export type UpdateCourseRequestDto = z.infer<typeof updateCourseRequestSchema>