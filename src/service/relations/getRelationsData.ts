import { db } from '~/db'
import type { GetRelationsDataResponseDto } from '~/dto/relations/getRelationsData/response'

export async function getRelationsData(): Promise<Record<string,GetRelationsDataResponseDto[]>> {
    const relations = await db.teacher_Course_Student.findMany({
        where: {
            freezeVersionId: null,
        },
        select: {
            id: true,
            teacherId: true,
            studentId: true,
            courseId: true,
        },
    })

    return relations.reduce((acc, relation) => {
        acc[relation.teacherId] = acc[relation.teacherId] || []
        return acc
    }, {} as Record<string,GetRelationsDataResponseDto[]>)
}
