import z from 'zod'

export const updateMidtermExamRequestSchema = z.object({
    id: z.coerce.number(),
    date: z.string().optional(),
    teacherId: z.coerce.number(),
    studentId: z.coerce.number(),
    typeId: z.coerce.number(),
    contents: z.string().optional(),
    result: z.string().optional(),
})

export type UpdateMidtermExamRequestDto = z.infer<typeof updateMidtermExamRequestSchema>
