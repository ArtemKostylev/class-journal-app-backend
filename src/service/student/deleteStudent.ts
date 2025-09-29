import { db } from '~/db'

export async function deleteStudent(id: number): Promise<void> {
    await db.student.update({
        where: {
            id,
        },
        data: {
            deleted: true,
        },
    })

    await db.teacher_Course_Student.updateMany({
        where: {
            studentId: id,
        },
        data: {
            archived: true,
        },
    })
}
