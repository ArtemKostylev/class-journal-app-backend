import { endOfMonth, format, startOfMonth } from 'date-fns'
import type { Months } from '~/const/months'
import type { GetReplacementListRequestDto } from '~/dto/replacement/getReplacementList/request'
import type { ReplacementDto, ReplacementListResponseDto, ReplacementRow } from '~/dto/replacement/getReplacementList/response'
import { academicYearToCalendarByMonth } from '~/utils/academicDate'
import { db } from '~/db'
import { type JournalEntry, type Replacement, type Student, type Teacher_Course_Student } from '@prisma/client'
import { convertStudentClass, convertStudentName } from '~/mappers/student'
import { DATE_FORMAT } from '~/const/dateFormat'
import { getVersionByYear } from '../freezeVersion'

export async function getReplacementList(params: GetReplacementListRequestDto): Promise<ReplacementListResponseDto> {
    const { year, month, teacherId, courseId } = params

    const calendarYear = academicYearToCalendarByMonth(year, String(month) as Months)
    const dateGte = startOfMonth(new Date(calendarYear, month, 1))
    const dateLte = endOfMonth(dateGte)

    const freezeVersion = await getVersionByYear(params.year)

    const replacements = await db.teacher_Course_Student.findMany({
        where: {
            teacherId: teacherId,
            courseId: courseId,
            archived: false,
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
                orderBy: {
                    date: 'asc',
                },
                where: {
                    date: {
                        gte: dateGte,
                        lte: dateLte,
                    },
                    mark: {
                        in: ['Б'],
                    },
                },
                select: {
                    id: true,
                    date: true,
                    replacement: {
                        select: {
                            id: true,
                            date: true,
                        },
                    },
                },
            },
        },
    })

    console.log(replacements)

    return {
        rows: replacements.map(convertReplacementToDto),
    }
}

type ReplacementSelection = Pick<Teacher_Course_Student, 'id' | 'archived'> & {
    student: Pick<Student, 'name' | 'surname' | 'class' | 'program'> | null
    journalEntry: (Pick<JournalEntry, 'id' | 'date'> & {
        replacement: Pick<Replacement, 'id' | 'date'> | null
    })[]
}

export function convertReplacementToDto(replacement: ReplacementSelection): ReplacementRow {
    return {
        relationId: replacement.id,
        studentName: convertStudentName(replacement.student),
        studentClass: convertStudentClass(replacement.student),
        archived: replacement.archived,
        replacements: replacement.journalEntry.reduce((acc, entry) => {
            acc[entry.id] = {
                id: entry.replacement?.id,
                date: entry.replacement?.date ? format(entry.replacement.date, DATE_FORMAT) : undefined,
                journalEntryId: entry.id,
                journalEntryDate: format(entry.date, DATE_FORMAT),
            }
            return acc
        }, {} as Record<number, ReplacementDto>),
    }
}
