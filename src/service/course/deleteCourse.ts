import { db } from '~/db'

export async function deleteCourse(id: number): Promise<void> {
    await db.course.update({
        where: { id },
        data: {
            deleted: true,
        },
    })

    await db.teacher_Course_Student.updateMany({
        where: { courseId: id },
        data: {
            archived: true,
        },
    })
}
