import type { ConsultListRequestDto } from '~/dto/consult/getConsultList/request'
import { freezeVersionService } from '../freezeVersion'
import type { ConsultListResponseDto } from '~/dto/consult/getConsultList/response'
import { db } from '~/db'
import { convertStudentName } from '~/mappers/student'
import { format } from 'date-fns'
import { DATE_FORMAT } from '~/const/dateFormat'

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
            archived: true,
            consult: {
                orderBy: { date: 'asc' },
                where: { year },
            },
            student: true,
        },
    })

    return consultRelations.map((item) => ({
        relationId: item.id,
        studentName: convertStudentName(item.student),
        archived: item.archived,
        consults: item.consult.map((consult) => ({
            id: consult.id,
            date: consult.date ? format(consult.date, DATE_FORMAT) : '',
            hours: consult.hours,
        })),
    }))
}
