import { db } from '../db'
import { type Consult, type Student } from '@prisma/client'
import { freezeVersionService } from './freezeVersion'

interface ConsultDto {
    id: number
    date: string
    hours: number
    relationId: number
    year: number
}

interface UpdateConsultParams {
    consults: ConsultDto[]
}

interface GetAllConsultsParams {
    teacherId: number
    courseId: number
    year: number
}

interface GetAllConsultsReturnValue {
    id: number
    student: Student | null
    consults: Consult[] | null
}

class ConsultService {
    public async updateConsults(params: UpdateConsultParams): Promise<void> {
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

    public async getAllConsults(params: GetAllConsultsParams): Promise<GetAllConsultsReturnValue[]> {
        const { teacherId, courseId, year } = params

        const freezeVersion = await freezeVersionService.getByYear(year)

        const consultRelations = await db.teacher_Course_Student.findMany({
            where: {
                teacherId,
                courseId,
                freezeVersionId: freezeVersion?.id,
                archived: false,
            },
            select: {
                id: true,
                consult: {
                    orderBy: { date: 'asc' },
                    where: { year },
                },
                student: true,
            },
        })

        return consultRelations.map((item) => ({
            id: item.id,
            student: item.student,
            consults: item.consult,
        }))
    }
}

export const consultService = new ConsultService()
