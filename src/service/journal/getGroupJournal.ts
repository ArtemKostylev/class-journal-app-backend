import { compareAsc, endOfMonth, format, parse } from 'date-fns'
import type { GroupJournalDto } from './models'
import { freezeVersionService } from '../freezeVersion'
import { db } from '../../db'
import { ACADEMIC_PERIODS, type AcademicPeriods } from '../../const/academicPeriods'
import { MONTHS } from '../../const/months'
import { PROGRAMS } from '../../const/programs'
import type { Student } from '@prisma/client'
import { convertJournalEntriesToDto, convertQuarterMarksToDto } from './mappers'
import { DATE_FORMAT } from '~/const/dateFormat'
import { academicYearToCalendarByPeriod } from '~/utils/academicDate'
import { convertStudentName } from '~/mappers/student'

interface GetGroupJournalRequestDto {
    teacherId: number
    courseId: number
    year: number
    period: string
}

interface GetGroupJournalResponseDto {
    group: string
    dates: Record<string, string[]>
    rows: Record<number, GroupJournalDto>
}

export async function getGroupJournal(
    params: GetGroupJournalRequestDto
): Promise<GetGroupJournalResponseDto[]> {
    const { teacherId, courseId, year, period } = params

    const freezeVersion = await freezeVersionService.getByYear(year)

    const startMonth = period === ACADEMIC_PERIODS.FIRST ? MONTHS.SEPTEMBER : MONTHS.JANUARY
    const endMonth = period === ACADEMIC_PERIODS.FIRST ? MONTHS.DECEMBER : MONTHS.MAY

    const calendarYear = academicYearToCalendarByPeriod(year, period as AcademicPeriods)

    const dateGte = new Date(calendarYear, Number(startMonth), 1)
    const dateLte = endOfMonth(new Date(calendarYear, Number(endMonth), 1))

    const students = await db.teacher_Course_Student.findMany({
        where: {
            teacherId,
            courseId,
            freezeVersionId: freezeVersion?.id,
        },
        select: {
            id: true,
            student: true,
            subgroup: true,
        },
    })

    const groups = {} as Record<string, number[]>

    students.forEach((relation) => {
        const group = getStudentGroup(relation)
        if (group) {
            groups[group] = [...(groups[group] || []), relation.id]
        }
    })

    return await Promise.all(
        Object.entries(groups).map(async ([group, relations]) =>
            getDataByGroup(group, relations, dateGte, dateLte, year, period)
        )
    )
}

interface RelationSelect {
    id: number
    student: Student | null
    subgroup: number | null
}

function getStudentGroup(relation: RelationSelect): string | undefined {
    const { student, subgroup } = relation

    if (!student?.class || !student?.program || !subgroup) {
        return undefined
    }

    return `Класс: ${student.class}${PROGRAMS[student.program]} Группа: ${subgroup}`
}

async function getDataByGroup(
    group: string,
    relations: number[],
    dateGte: Date,
    dateLte: Date,
    year: number,
    period: string
): Promise<GetGroupJournalResponseDto> {
    const rowsArray = await Promise.all(
        relations.map(async (relation): Promise<GroupJournalDto> => {
            return getGroupJournalDto(relation, dateGte, dateLte, year)
        })
    )

    const rows = rowsArray.reduce((acc, curr) => {
        acc[curr.relationId] = curr
        return acc
    }, {} as Record<number, GroupJournalDto>)

    const dates = await getDates(relations, dateGte, dateLte, period)

    return {
        group,
        dates,
        rows,
    }
}

async function getGroupJournalDto(
    relation: number,
    dateGte: Date,
    dateLte: Date,
    year: number
): Promise<GroupJournalDto> {
    const rowData = await db.teacher_Course_Student.findFirstOrThrow({
        where: {
            id: relation,
        },
        select: {
            id: true,
            archived: true,
            student: true,
            journalEntry: {
                where: {
                    date: {
                        gte: dateGte,
                        lte: dateLte,
                    },
                },
            },
            quaterMark: {
                where: {
                    year: year,
                },
            },
        },
    })

    const { id, archived, student, journalEntry, quaterMark } = rowData

    const marks = convertJournalEntriesToDto(journalEntry)
    const quarterMarks = convertQuarterMarksToDto(quaterMark)

    return {
        relationId: id,
        studentName: convertStudentName(student),
        archived,
        marks,
        quarterMarks,
    }
}

async function getDates(
    relations: number[],
    dateGte: Date,
    dateLte: Date,
    period: string
): Promise<Record<string, string[]>> {
    const persistedDates = await db.teacher_Course_Student.findMany({
        where: {
            id: {
                in: relations,
            },
        },
        select: {
            journalEntry: {
                where: {
                    date: {
                        gte: dateGte,
                        lte: dateLte,
                    },
                },
                select: {
                    date: true,
                },
                distinct: ['date'],
            },
        },
    })

    const dates = persistedDates.reduce((acc, item) => {
        item.journalEntry.forEach((entry) => {
            acc.push(entry.date)
        })
        return acc
    }, [] as Date[])

    const groupedDates = dates.reduce((acc, date) => {
        const month = String(date.getMonth()).padStart(2, '0')
        const monthDates = new Set(acc[month] || [])
        monthDates.add(format(date, DATE_FORMAT))
        acc[month] = Array.from(monthDates)

        return acc
    }, getBaseDatesObject(period))

    Object.entries(groupedDates).forEach(([month, dates]) => {
        groupedDates[month] = padEmptyDatesAndSort(dates, month)
    })

    return groupedDates
}

function getBaseDatesObject(period: string): Record<string, string[]> {
    if (period === ACADEMIC_PERIODS.FIRST) {
        return {
            '08': [],
            '09': [],
            '10': [],
            '11': [],
        }
    } else {
        return {
            '00': [],
            '01': [],
            '02': [],
            '03': [],
            '04': [],
        }
    }
}

function padEmptyDatesAndSort(dates: string[], month: string): string[] {
    const dateLimit = month === '00' ? 4 : 5
    while (dates.length < dateLimit) {
        dates.push('')
    }
    return dates.sort((a, b) =>
        compareAsc(parse(a, DATE_FORMAT, new Date()), parse(b, DATE_FORMAT, new Date()))
    )
}
