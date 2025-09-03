import type { UpdateMidtermExamTypeRequestDto } from '~/dto/midtermExamType/updateMidtermExamType/request'
import { db } from '~/db'

export async function updateMidtermExamType(params: UpdateMidtermExamTypeRequestDto): Promise<void> {
    await db.midtermExamType.update({
        where: { id: params.id },
        data: {
            name: params.name,
        },
    })
}
