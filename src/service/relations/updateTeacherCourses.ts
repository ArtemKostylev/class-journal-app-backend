import { db } from '~/db'
import type { UpdateTeacherCoursesRequestDto } from '~/dto/relations/updateTeacherCourses/request'

export async function updateTeacherCourses(params: UpdateTeacherCoursesRequestDto): Promise<void> {
    const { teacherId, coursesToAdd, coursesToRemove } = params

    const archivedEntries = await db.teacher_Course_Student.findMany({
        where: {
            teacherId,
            archived: true,
        },
    })

    const archivedEntriesSet = new Set(archivedEntries.map((entry) => entry.courseId))

    await Promise.all(
        coursesToAdd.map((courseId) => {
            if (archivedEntriesSet.has(courseId)) {
                return db.teacher_Course_Student.updateMany({
                    where: {
                        teacherId,
                        courseId,
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
                },
            })
        })
    )

    await Promise.all(
        coursesToRemove.map((courseId) => {
            return db.teacher_Course_Student.updateMany({
                where: {
                    teacherId,
                    courseId,
                },
                data: {
                    archived: true,
                },
            })
        })
    )
}
