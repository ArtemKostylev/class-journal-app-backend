import { parse } from 'date-fns'
import { DATE_FORMAT } from '~/const/dateFormat'
import { db } from '~/db'
import type { UpdateConsultRequestDto } from '~/dto/consult/updateConsult/request'

export async function updateConsults(params: UpdateConsultRequestDto): Promise<void> {
    const { consults } = params

    await Promise.all(
        consults.map(async (consult) => {
            const { id, date, hours, relationId, year } = consult

            if (!hours && !id) {
                return
            }

            if (!hours) {
                return await db.consult.delete({
                    where: {
                        id,
                    },
                })
            }

            return db.consult.upsert({
                where: {
                    id,
                },
                update: {
                    date: parse(date, DATE_FORMAT, new Date()),
                    hours,
                },
                create: {
                    date: parse(date, DATE_FORMAT, new Date()),
                    hours,
                    relationId,
                    year,
                },
            })
        })
    )
}
