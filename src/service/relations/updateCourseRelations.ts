import { db } from '~/db'
import type { UpdateRelationsRequestDto } from '~/dto/relations/updateRelations/request'

export async function updateCourseRelations(updatedRelations: UpdateRelationsRequestDto): Promise<void> {
    if (updatedRelations.length === 0) {
        return
    }

    await Promise.all(
        updatedRelations.map(async (relation) => {
            if (relation.studentId) {
                return
            }

            const existingRelations = await db.teacher_Course_Student.findMany({
                where: {
                    teacherId: relation.teacherId,
                    courseId: relation.courseId,
                },
            })

            if (existingRelations.length === 0 && relation.checked) {
                return db.teacher_Course_Student.create({
                    data: {
                        teacherId: relation.teacherId,
                        courseId: relation.courseId,
                        studentId: null,
                    },
                })
            }

            if (existingRelations.length > 0) {
                return db.teacher_Course_Student.updateMany({
                    where: {
                        teacherId: relation.teacherId,
                        courseId: relation.courseId,
                    },
                    data: {
                        archived: !relation.checked,
                    },
                })
            }
        })
    )
}
