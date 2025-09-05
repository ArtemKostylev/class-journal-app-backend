import { db } from '~/db'
import type { UpdateSpecializationRequestDto } from '~/dto/specialization/updateSpecialization/request'

export async function updateSpecialization(request: UpdateSpecializationRequestDto) {
    await db.specialization.upsert({
        where: { id: request.id },
        update: { name: request.name },
        create: { name: request.name },
    })
}
