import { db } from '~/db'
import { DATE_FORMAT } from '~/constants'
import { format } from 'date-fns'

const clearDuplicateMarks = async () => {
    const entries = await db.journalEntry.findMany()

    const mappedEntries = new Map<string, number[]>()

    entries.forEach((entry) => {
        const key = `${format(entry.date, DATE_FORMAT)} ${entry.relationId}`
        mappedEntries.set(key, [...(mappedEntries.get(key) || []), entry.id])
    })

    mappedEntries.forEach((value, key) => {
        if (value.length > 1) {
            value.sort(function (a, b) {
                return a - b
            })
            value.slice(0, value.length - 1).forEach(async (it) => {
                // TODO: try cascade delete
                await db.replacement.deleteMany({
                    where: {
                        entryId: it,
                    },
                })
                await db.journalEntry.delete({
                    where: {
                        id: it,
                    },
                })
            })
        }
    })

    return true
}

clearDuplicateMarks()

console.log('Done')
