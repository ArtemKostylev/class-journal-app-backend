import { db } from '~/db'
import type { StudentListItem } from '~/dto/student/getStudentList/response'

export async function getStudentList(): Promise<StudentListItem[]> {
    const students = await db.student.findMany({
        where: {
            deleted: false,
            freezeVersionId: null,
        },
        select: {
            id: true,
            name: true,
            surname: true,
            specializationId: true,
            class: true,
            program: true,
        },
    })

    return students
}
