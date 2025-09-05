import { db } from '~/db'

export async function deleteSpecialization(id: number) {
    const students = await db.student.findMany({
        where: { specializationId: id },
    })

    if (students.length > 0) {
        throw new Error('Specialization has students')
    }

    await db.specialization.update({
        where: { id: id },
        data: { deleted: true },
    })
}
