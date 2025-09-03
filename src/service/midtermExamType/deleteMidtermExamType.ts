import { db } from '~/db'

export async function deleteMidtermExamType(id: number): Promise<void> {
    await db.midtermExam.updateMany({
        where: { typeId: id },
        data: {
            deleted: true,
        },
    })

    await db.midtermExamType.update({
        where: { id },
        data: {
            deleted: true,
        },
    })
}
