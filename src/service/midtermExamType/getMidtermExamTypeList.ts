import { db } from '~/db'
import type { GetMidtermExamTypeListResponseDto, MidtermExamTypeDto } from '~/dto/midtermExamType/getMidtermExamTypeList/response'

export async function getMidtermExamTypeList(): Promise<GetMidtermExamTypeListResponseDto> {
    const midtermExamTypes = await db.midtermExamType.findMany({
        where: {
            deleted: false,
        },
    })
    return {
        midtermExamTypes: midtermExamTypes.map((midtermExamType) => ({
            id: midtermExamType.id,
            name: midtermExamType.name,
        })),
        midtermExamTypesById: midtermExamTypes.reduce((acc, midtermExamType) => {
            acc[midtermExamType.id] = midtermExamType
            return acc
        }, {} as Record<number, MidtermExamTypeDto>),
    }
}
