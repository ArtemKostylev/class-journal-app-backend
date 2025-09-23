import type { GetTeacherListForRelationsResponseDto } from '~/dto/teacher/getTeacherListForRelations/response'
import { db } from '~/db'

export async function getTeacherListForRelations(): Promise<GetTeacherListForRelationsResponseDto[]> {
    const teachers = await db.teacher.findMany({
        where: {
            deleted: false,
            freezeVersionId: null,
        },
        select: {
            id: true,
            name: true,
            surname: true,
            parent: true,
        },
        orderBy: {
            surname: 'asc',
        },
    })

    return teachers.map((teacher) => ({
        id: teacher.id,
        teacherName: `${teacher.surname} ${teacher.name} ${teacher.parent}`,
    }))
}
