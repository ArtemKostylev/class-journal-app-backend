import { db } from '~/db'
import { GetSpecializationListResponseDto } from '~/dto/specialization/getSpecializationList/response'

export async function getSpecializationList(): Promise<GetSpecializationListResponseDto[]> {
    const specializationList = await db.specialization.findMany({
        where: {
            freezeVersionId: null,
            deleted: false,
        },
        select: {
            id: true,
            name: true,
        },
    })
    return specializationList
}
