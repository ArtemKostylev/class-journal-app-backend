import type { UpdateMidtermExamRequestDto } from '~/dto/midtermExam/updateMidtermExam/request'
import { db } from '~/db'
import { parse } from 'date-fns'
import { DATE_FORMAT } from '~/const/dateFormat'

export async function updateMidtermExam(params: UpdateMidtermExamRequestDto): Promise<void> {
    const { id, ...rest } = params;

    await db.midtermExam.upsert({
        where: {
            id,
        },
        update: {
            ...rest,
            date: rest.date ? parse(rest.date, DATE_FORMAT, new Date()) : undefined,
        },
        create: {
            ...rest,
            date: rest.date ? parse(rest.date, DATE_FORMAT, new Date()) : undefined,
        },
    })
}
