import type { Program } from '@prisma/client'
import { db } from '~/db'
import type { UpdateStudentRequestDto } from '~/dto/student/updateStudent/request'

export async function updateStudent(params: UpdateStudentRequestDto): Promise<void> {
    await db.student.upsert({
        where: {
            id: params.id,
        },
        create: {
            name: params.name,
            surname: params.surname,
            program: params.program as Program,
            class: params.class,
            specializationId: params.specializationId,
        },
        update: {
            name: params.name,
            surname: params.surname,
            program: params.program as Program,
            class: params.class,
            specializationId: params.specializationId,
        },
    })
}
