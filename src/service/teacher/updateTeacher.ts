import { db } from '~/db'
import type { updateTeacherRequestDto } from '~/dto/teacher/updateTeacher/request'

export async function updateTeacher(params: updateTeacherRequestDto): Promise<void> {
    const { id, name, surname, parent, userId } = params

    await db.teacher.upsert({
        where: {
            id,
        },
        create: {
            name,
            surname,
            parent,
            userId,
        },
        update: {
            name,
            surname,
            parent,
            userId,
        },
    })
}
