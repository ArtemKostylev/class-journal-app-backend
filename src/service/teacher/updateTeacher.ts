import { db } from '~/db'
import type { updateTeacherRequestDto } from '~/dto/teacher/updateTeacher/request'

export async function updateTeacher(params: updateTeacherRequestDto): Promise<void> {
    const { id, name, surname, parent } = params

    await db.teacher.upsert({
        where: {
            id,
        },
        create: {
            name,
            surname,
            parent,
        },
        update: {
            name,
            surname,
            parent,
        },
    })
}
