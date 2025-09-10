import { db } from '~/db'
import { GetStudentListForTeacherResponseDto } from '~/dto/student/getStudentListForTeacher/response'

export async function getStudentListForTeacher(teacherId: number): Promise<GetStudentListForTeacherResponseDto[]> {
    const relations = await db.teacher_Course_Student.findMany({
        where: {
            freezeVersionId: null,
            teacherId: {
                equals: teacherId,
            },
            archived: false,
            student: {
                deleted: false,
            },
        },
        distinct: ['studentId'],
        select: {
            student: {
                select: {
                    id: true,
                    name: true,
                    surname: true,
                },
            },
        },
    })

    return relations.map((relation) => ({
        value: relation.student?.id ?? 0,
        text: `${relation.student?.surname} ${relation.student?.name}`,
    }))
}
