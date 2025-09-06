import { db } from '~/db'
import type { GetStudentListResponseDto } from '~/dto/student/getStudentList/response'

export async function getStudentList(): Promise<GetStudentListResponseDto[]> {
    const students = await db.student.findMany({
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
