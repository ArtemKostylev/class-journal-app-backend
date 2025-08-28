import { endOfMonth, format } from 'date-fns'
import type { GroupJournalDto } from './models'
import { freezeVersionService } from '../freezeVersion'
import { db } from '../../db'
import { ACADEMIC_PERIODS } from '../../const/academicPeriods'
import { MONTHS } from '../../const/months'
import { PROGRAMS } from '../../const/programs'
import type { Student } from '@prisma/client'
import { convertJournalEntriesToDto, convertQuarterMarksToDto, convertStudentName } from './mappers'
import { DATE_FORMAT } from '../../constants'

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

    const dateGte = new Date(year, Number(startMonth), 1)
    const dateLte = endOfMonth(new Date(year, Number(endMonth), 1))

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
            getDataByGroup(group, relations, dateGte, dateLte, year)
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

    return `Класс: ${student.class}${PROGRAMS[student.program]}  Группа: ${subgroup}`
}

async function getDataByGroup(
    group: string,
    relations: number[],
    dateGte: Date,
    dateLte: Date,
    year: number
): Promise<GetGroupJournalResponseDto> {
    const rows = await Promise.all(
        relations.map(async (relation): Promise<GroupJournalDto> => {
            return getGroupJournalDto(relation, dateGte, dateLte, year)
        })
    )

    const dates = await getDates(relations, dateGte, dateLte)

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
    dateLte: Date
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

    return dates.reduce((acc, date) => {
        const month = format(date, 'MM')
        acc[month] = [...(acc[month] || []), format(date, DATE_FORMAT)]
        return acc
    }, {} as Record<string, string[]>)
}
