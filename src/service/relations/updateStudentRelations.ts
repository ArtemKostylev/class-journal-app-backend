import { db } from '~/db'
import type { UpdateRelationsRequestDto } from '~/dto/relations/updateRelations/request'

export async function updateStudentRelations(updatedRelations: UpdateRelationsRequestDto): Promise<void> {
    if (updatedRelations.length === 0) {
        return
    }

    // Clear empty relation, created during previous step
    await await db.teacher_Course_Student.deleteMany({
        where: {
            teacherId: updatedRelations[0].teacherId,
            courseId: updatedRelations[0].courseId,
            studentId: null,
        },
    })

    await Promise.all(
        updatedRelations.map(async (relation) => {
            if (!relation.studentId) {
                return
            }

            const existingRelation = await db.teacher_Course_Student.findFirst({
                where: {
                    teacherId: relation.teacherId,
                    courseId: relation.courseId,
                    studentId: relation.studentId,
                },
            })

            if (!existingRelation?.archived && relation.checked) {
                return
            }

            if (existingRelation?.archived && !relation.checked) {
                return
            }

            if (existingRelation) {
                return db.teacher_Course_Student.update({
                    where: {
                        id: existingRelation.id,
                    },
                    data: {
                        archived: !relation.checked,
                    },
                })
            }

            if (!existingRelation && relation.checked) {
                return db.teacher_Course_Student.create({
                    data: {
                        teacherId: relation.teacherId,
                        courseId: relation.courseId,
                        studentId: relation.studentId,
                    },
                })
            }
        })
    )
}
