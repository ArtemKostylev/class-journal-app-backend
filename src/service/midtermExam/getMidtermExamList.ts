import { db } from '~/db'
import type { GetMidtermExamListRequestDto } from '~/dto/midtermExam/getMidtermExamList/request'
import type { GetMidtermExamListResponseDto } from '~/dto/midtermExam/getMidtermExamList/response'
import { academicYearToCalendarByPeriod } from '~/utils/academicDate'
import { AcademicPeriods, ACADEMIC_PERIODS } from '~/const/academicPeriods'
import { MONTHS } from '~/const/months'
import type { MidtermExam, MidtermExamType, Student } from '@prisma/client'
import { format } from 'date-fns'
import { DATE_FORMAT } from '~/const/dateFormat'
import { convertStudentName } from '~/mappers/student'
import { convertStudentClass } from '~/mappers/student'
import { getVersionByYear } from '../freezeVersion'

export async function getMidtermExamList(params: GetMidtermExamListRequestDto): Promise<GetMidtermExamListResponseDto[]> {
    const { teacherId, year, typeId, period } = params

    const freezeVersion = await getVersionByYear(year)

    const calendarYear = academicYearToCalendarByPeriod(year, period as AcademicPeriods)
    const startMonth = period === ACADEMIC_PERIODS.FIRST ? MONTHS.SEPTEMBER : MONTHS.JANUARY
    const endMonth = period === ACADEMIC_PERIODS.FIRST ? MONTHS.DECEMBER : MONTHS.MAY

    const dateGte = new Date(calendarYear, Number(startMonth), 1)
    const dateLte = new Date(calendarYear, Number(endMonth), 31)

    const midtermExams = await db.midtermExam.findMany({
        where: {
            teacherId,
            freezeVersionId: freezeVersion?.id,
            deleted: false,
            typeId,
            date: {
                gte: dateGte,
                lte: dateLte,
            },
        },
        orderBy: {
            date: 'desc',
        },
        select: {
            id: true,
            date: true,
            contents: true,
            result: true,
            student: {
                select: {
                    id: true,
                    name: true,
                    surname: true,
                    class: true,
                    program: true,
                },
            },
            type: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    })

    return midtermExams.map((midtermExam, index) => midtermExamToDto(midtermExam, index + 1))
}

type MidtermExamSelected = Pick<MidtermExam, 'id' | 'date' | 'contents' | 'result'> & {
    student: Pick<Student, 'id' | 'name' | 'surname' | 'class' | 'program'>
    type: Pick<MidtermExamType, 'id' | 'name'>
}

function midtermExamToDto(midtermExam: MidtermExamSelected, index: number): GetMidtermExamListResponseDto {
    return {
        id: midtermExam.id,
        date: midtermExam.date ? format(midtermExam.date, DATE_FORMAT) : '',
        contents: midtermExam.contents ?? '',
        result: midtermExam.result ?? '',
        studentName: convertStudentName(midtermExam.student),
        studentClass: convertStudentClass(midtermExam.student),
        studentId: midtermExam.student.id,
        typeId: midtermExam.type.id,
        typeName: midtermExam.type.name,
        index,
    }
}
