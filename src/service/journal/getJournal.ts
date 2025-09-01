import { freezeVersionService } from '../freezeVersion'
import { type MarkDto, type QuarterMarkDto } from './models'
import { db } from '../../db'
import { endOfMonth } from 'date-fns'
import { PROGRAMS } from '../../const/programs'
import { convertJournalEntriesToDto, convertQuarterMarksToDto, convertStudentName } from './mappers'
import { academicYearToCalendarByMonth } from '~/utils/academicDate'
import type { Months } from '~/const/months'

interface GetJournalRequestDto {
    teacherId: number
    courseId: number
    year: number
    month: number
}

interface GetJournalResponseDto {
    relationId: number
    studentName: string
    class: string
    archived: boolean
    marks: Record<string, MarkDto>
    quarterMarks: Record<string, QuarterMarkDto>
}

export async function getJournal(params: GetJournalRequestDto): Promise<GetJournalResponseDto[]> {
    const { teacherId, courseId, year, month } = params

    const freezeVersion = await freezeVersionService.getByYear(year)
    const calendarYear = academicYearToCalendarByMonth(year, String(month) as Months)

    const dateGte = new Date(calendarYear, month, 1)
    const dateLte = endOfMonth(dateGte)

    console.log(dateGte, dateLte)

    const journal = await db.teacher_Course_Student.findMany({
        where: {
            teacherId,
            courseId,
            freezeVersionId: freezeVersion?.id,
        },
        select: {
            id: true,
            archived: true,
            student: {
                select: {
                    name: true,
                    surname: true,
                    class: true,
                    program: true,
                },
            },
            journalEntry: {
                where: {
                    date: {
                        gte: dateGte,
                        lte: dateLte,
                    },
                },
                select: {
                    id: true,
                    date: true,
                    mark: true,
                },
            },
            quaterMark: {
                where: {
                    year,
                },
                select: {
                    id: true,
                    period: true,
                    mark: true,
                    year: true,
                },
            },
        },
    })

    return journal.map((row) => ({
        relationId: row.id,
        studentName: convertStudentName(row.student),
        class: `${row.student?.class} ${row.student?.program ? PROGRAMS[row.student?.program] : ''}`,
        archived: row.archived,
        marks: convertJournalEntriesToDto(row.journalEntry),
        quarterMarks: convertQuarterMarksToDto(row.quaterMark),
    }))
}
