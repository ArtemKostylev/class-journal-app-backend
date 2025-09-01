import type { Period } from '@prisma/client'
import { db } from '../../db'
import { startOfDay } from 'date-fns'
import { DATE_FORMAT } from '~/constants'
import { parse } from 'date-fns'

interface ChangedMarkDto {
    id: number
    mark: string
    date: string
    relationId: number
}

interface ChangedQuarterMarkDto {
    id: number
    period: Period
    year: number
    mark: string
    relationId: number
}

interface UpdateJournalRequestDto {
    marks: ChangedMarkDto[]
    quarterMarks: ChangedQuarterMarkDto[]
}

export async function updateJournal(params: UpdateJournalRequestDto): Promise<void> {
    const { marks, quarterMarks } = params

    await Promise.all(marks.map(updateJournalEntry))

    await Promise.all(quarterMarks.map(updateQuarterMark))
}

async function updateJournalEntry(mark: ChangedMarkDto): Promise<void> {
    if (!mark.id && !mark.mark) {
        return
    }

    if (!mark.id) {
        const journalEntry = await db.journalEntry.create({
            data: {
                date: startOfDay(parse(mark.date, DATE_FORMAT, new Date())),
                mark: mark.mark,
                relationId: mark.relationId,
            },
        })
        console.log(journalEntry)
    } else if (!mark.mark) {
        await db.journalEntry.delete({
            where: { id: mark.id },
        })
    } else {
        await db.journalEntry.update({
            where: { id: mark.id },
            data: { mark: mark.mark, date: startOfDay(parse(mark.date, DATE_FORMAT, new Date())) },
        })
    }
}

async function updateQuarterMark(quarterMark: ChangedQuarterMarkDto): Promise<void> {
    if (!quarterMark.id && !quarterMark.mark) {
        return
    }

    if (!quarterMark.id) {
        await db.quaterMark.create({
            data: {
                mark: quarterMark.mark,
                period: quarterMark.period,
                year: quarterMark.year,
                relationId: quarterMark.relationId,
            },
        })
    } else if (!quarterMark.mark) {
        await db.quaterMark.delete({
            where: { id: quarterMark.id },
        })
    } else {
        await db.quaterMark.update({
            where: { id: quarterMark.id },
            data: { mark: quarterMark.mark, period: quarterMark.period, year: quarterMark.year },
        })
    }
}
