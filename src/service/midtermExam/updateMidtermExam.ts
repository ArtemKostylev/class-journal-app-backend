import type { UpdateMidtermExamRequestDto } from '~/dto/midtermExam/updateMidtermExam/request'
import { db } from '~/db'
import { parse } from 'date-fns'
import { DATE_FORMAT } from '~/constants'

export async function updateMidtermExam(params: UpdateMidtermExamRequestDto): Promise<void> {
    await db.midtermExam.upsert({
        where: {
            id: params.id,
        },
        update: {
            ...params,
            date: params.date ? parse(params.date, DATE_FORMAT, new Date()) : undefined,
        },
        create: {
            ...params,
            date: params.date ? parse(params.date, DATE_FORMAT, new Date()) : undefined,
        },
    })
}
