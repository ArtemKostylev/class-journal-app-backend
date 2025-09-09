import { db } from '~/db'
import type { UpdateCourseStudentsRequestDto } from '~/dto/relations/updateCourseStudents/request'

export async function updateCourseStudents(params: UpdateCourseStudentsRequestDto): Promise<void> {
    const { relationId, teacherId, courseId, studentsToAdd, studentsToRemove } = params

    // Clear empty relation, created during previous step
    await db.teacher_Course_Student.delete({
        where: {
            id: relationId,
            studentId: null,
        },
    })

    await Promise.all(
        studentsToAdd.map(async (studentId) => {
            const existingRelation = await db.teacher_Course_Student.findFirst({
                where: {
                    teacherId,
                    courseId,
                    studentId,
                },
            })

            if (existingRelation) {
                return db.teacher_Course_Student.update({
                    where: {
                        id: existingRelation.id,
                    },
                    data: {
                        archived: false,
                    },
                })
            }

            return db.teacher_Course_Student.create({
                data: {
                    teacherId,
                    courseId,
                    studentId,
                },
            })
        })
    )

    await Promise.all(
        studentsToRemove.map((studentId) => {
            return db.teacher_Course_Student.update({
                where: {
                    id: studentId,
                },
                data: {
                    archived: true,
                },
            })
        })
    )
}
