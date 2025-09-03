import { db } from '~/db'
import type { DeleteMidtermExamRequestDto } from '~/dto/midtermExam/deleteMidtermExam/request'

export async function deleteMidtermExam(params: DeleteMidtermExamRequestDto): Promise<void> {
    await db.midtermExam.update({
        where: { id: params.id },
        data: {
            deleted: true,
        },
    })
}
