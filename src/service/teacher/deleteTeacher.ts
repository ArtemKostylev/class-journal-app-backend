import { db } from '~/db'

export async function deleteTeacher(id: number) {
    await db.teacher.update({
        where: { id },
        data: {
            deleted: true,
        },
    })

    await db.teacher_Course_Student.updateMany({
        where: {
            teacherId: id,
        },
        data: {
            archived: true,
        },
    })
}
