import type { Program } from '@prisma/client'
import { parse } from 'date-fns'
import { DATE_FORMAT } from '~/const/dateFormat'
import { db } from '~/db'
import type { UpdateGroupConsultRequestDto } from '~/dto/groupConsult/updateGroupConsult/request'

export async function updateGroupConsult(params: UpdateGroupConsultRequestDto): Promise<void> {
    const { consults, teacher, course } = params

    await Promise.all(
        consults.map(async (consult) => {
            if (!consult?.hours && !consult?.consultId) {
                return
            }

            if (!consult.hours) {
                return await db.groupConsult.delete({
                    where: {
                        id: consult.consultId,
                    },
                })
            }

            db.groupConsult.upsert({
                where: {
                    id: consult.consultId,
                },
                update: {
                    date: parse(consult.date, DATE_FORMAT, new Date()),
                    hours: consult.hours,
                },
                create: {
                    date: parse(consult.date, DATE_FORMAT, new Date()),
                    year: consult.year,
                    teacherId: teacher,
                    courseId: course,
                    hours: consult.hours,
                    program: consult.program as Program,
                    subgroup: consult.subgroup,
                    class: consult.class,
                },
            })
        })
    )
}
