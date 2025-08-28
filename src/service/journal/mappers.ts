import type { JournalEntry, QuaterMark as QuarterMark, Student } from '@prisma/client'
import { format } from 'date-fns'
import type { MarkDto, QuarterMarkDto } from './models'
import { DATE_FORMAT } from '../../constants'

type JournalEntrySelected = Pick<JournalEntry, 'id' | 'date' | 'mark'>

export function convertJournalEntriesToDto(entries: JournalEntrySelected[]): Record<string, MarkDto> {
    return entries.reduce((acc, entry) => {
        acc[format(entry.date, DATE_FORMAT)] = {
            id: entry.id,
            mark: entry.mark,
            date: format(entry.date, DATE_FORMAT),
        }
        return acc
    }, {} as Record<string, MarkDto>)
}

type QuarterMarkSelected = Pick<QuarterMark, 'id' | 'period' | 'mark' | 'year'>

export function convertQuarterMarksToDto(
    quarterMarks: QuarterMarkSelected[]
): Record<string, QuarterMarkDto> {
    return quarterMarks.reduce((acc, quarterMark) => {
        acc[quarterMark.period] = {
            id: quarterMark.id,
            period: quarterMark.period,
            year: quarterMark.year as number,
            mark: quarterMark.mark as string,
        }
        return acc
    }, {} as Record<string, QuarterMarkDto>)
}

type StudentSelected = Pick<Student, 'name' | 'surname' | 'class' | 'program'>

export function convertStudentName(student: StudentSelected | null): string {
    if (!student) {
        return ''
    }

    return `${student.surname} ${student.name}`
}