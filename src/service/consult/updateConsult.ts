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
                    date,
                    hours,
                },
                create: {
                    date,
                    hours,
                    relationId,
                    year,
                },
            })
        })
    )
}
