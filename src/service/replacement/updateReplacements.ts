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
                    date: replacement.date,
                },
                create: {
                    date: replacement.date,
                    entryId: replacement.journalEntryId,
                },
            })
        })
    )
}
