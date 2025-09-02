import type { ConsultListRequestDto } from '~/dto/consult/getConsultList/request'
import { freezeVersionService } from '../freezeVersion'
import type { ConsultListResponseDto } from '~/dto/consult/getConsultList/response'
import { db } from '~/db'

export async function getConsultList(params: ConsultListRequestDto): Promise<ConsultListResponseDto[]> {
    const { teacherId, courseId, year } = params

    const freezeVersion = await freezeVersionService.getByYear(year)

    const consultRelations = await db.teacher_Course_Student.findMany({
        where: {
            teacherId,
            courseId,
            freezeVersionId: freezeVersion?.id,
            archived: false,
        },
        select: {
            id: true,
            consult: {
                orderBy: { date: 'asc' },
                where: { year },
            },
            student: true,
        },
    })

    return consultRelations.map((item) => ({
        id: item.id,
        student: item.student,
        consults: item.consult,
    }))
}
