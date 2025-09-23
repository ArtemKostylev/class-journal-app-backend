import { db } from '~/db'
import type { GetStudentListForRelationsResponseDto, StudentListForRelationsItem } from '~/dto/student/getStudentListForRelations/response'

export async function getStudentListForRelations(): Promise<GetStudentListForRelationsResponseDto[]> {
    const students = await db.student.findMany({
        where: {
            deleted: false,
            freezeVersionId: null,
        },
        select: {
            id: true,
            name: true,
            surname: true,
            class: true,
            program: true,
        },
        orderBy: [
            {
                class: 'asc',
            },
            {
                program: 'asc',
            },
        ],
    })

    const result = students.reduce((acc, student) => {
        const key = `${student.class}-${student.program}`
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push({
            id: student.id,
            name: `${student.surname} ${student.name}`,
        })
        return acc
    }, {} as Record<string, StudentListForRelationsItem[]>)

    return Object.entries(result).map(([key, value]) => ({
        group: key,
        students: value,
    }))
}
