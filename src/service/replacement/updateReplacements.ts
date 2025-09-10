import { parse } from 'date-fns'
import { DATE_FORMAT } from '~/const/dateFormat'
import { db } from '~/db'
import type { UpdateReplacementsRequestDto } from '~/dto/replacement/updateReplacements/request'

export async function updateReplacements(replacements: UpdateReplacementsRequestDto): Promise<void> {
    await Promise.all(
        replacements.map((replacement) => {
            return db.replacement.upsert({
                where: {
                    id: replacement.id,
                },
                update: {
                    date: parse(replacement.date, DATE_FORMAT, new Date()),
                },
                create: {
                    date: parse(replacement.date, DATE_FORMAT, new Date()),
                    entryId: replacement.journalEntryId,
                },
            })
        })
    )
}
