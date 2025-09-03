import z from 'zod'

export const updateMidtermExamRequestSchema = z.object({
    id: z.number(),
    date: z.string().optional(),
    teacherId: z.number(),
    studentId: z.number(),
    typeId: z.number(),
    contents: z.string().optional(),
    result: z.string().optional(),
})

export type UpdateMidtermExamRequestDto = z.infer<typeof updateMidtermExamRequestSchema>
