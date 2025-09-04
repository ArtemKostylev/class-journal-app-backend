import { Program } from '@prisma/client'
import { db } from '../db'
import { getVersionByYear } from './freezeVersion'

interface GroupConsultDto {
    program: Program
    subgroup: number
    class: number
    consultId: number
    date: string
    hours: number
    year: number
}

interface UpdateGroupConsultParams {
    consults: GroupConsultDto[]
    teacher: number
    course: number
}

interface GetAllGroupConsultsParams {
    teacherId: number
    courseId: number
    year: number
}

interface GetAllGroupConsultsReturnValue {
    group: string
    class: number
    program: Program
    subgroup?: number | undefined
    consults: {
        id: number
        date: string
        hours: number
    }[]
}

interface GroupConsultMapped {
    id: number
    date: string
    hours: number
    class: number
    program: Program
    subgroup: number | null
}

export class GroupConsultService {
    public async updateGroupConsults(params: UpdateGroupConsultParams): Promise<void> {
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
                        date: consult.date,
                        hours: consult.hours,
                    },
                    create: {
                        date: consult.date,
                        year: consult.year,
                        teacherId: teacher,
                        courseId: course,
                        hours: consult.hours,
                        program: consult.program,
                        subgroup: consult.subgroup,
                        class: consult.class,
                    },
                })
            })
        )
    }

    public async getAllGroupConsults(
        params: GetAllGroupConsultsParams
    ): Promise<GetAllGroupConsultsReturnValue[]> {
        const { teacherId, courseId, year } = params

        const freezeVersion = await getVersionByYear(year)

        const availableGroups = await db.teacher_Course_Student.findMany({
            where: {
                teacherId,
                courseId,
                archived: false,
                freezeVersionId: freezeVersion?.id,
            },
            select: {
                subgroup: true,
                student: {
                    select: {
                        class: true,
                        program: true,
                    },
                },
            },
        })

        const availableGroupsSet = new Set(
            availableGroups.map(
                (item) => `${item.student?.class} ${item.student?.program} ${item.subgroup || '...'}`
            )
        )

        const allConsults = await db.groupConsult.findMany({
            where: {
                teacherId,
                courseId,
                year,
            },
        })

        let consultsByGroups = new Map<string, GroupConsultMapped[]>()

        allConsults.forEach((item) => {
            const key = `${item.class} ${item.program} ${item.subgroup || '...'}`

            const value: GroupConsultMapped = {
                id: item.id,
                date: item.date.toISOString(),
                hours: item.hours,
                class: item.class,
                program: item.program,
                subgroup: item.subgroup,
            }

            if (consultsByGroups.has(key)) {
                consultsByGroups.get(key)?.push(value)
            } else {
                consultsByGroups.set(key, [value])
            }
        })

        return Array.from(availableGroupsSet).map((group) => {
            const consults = consultsByGroups.get(group)
            if (!consults) {
                return {
                    group,
                    program: Program.OP,
                    class: 0,
                    consults: [],
                }
            }
            return {
                group,
                program: consults[0].program,
                class: consults[0].class,
                subgroup: consults[0].subgroup || undefined,
                consults,
            }
        })
    }

    public async deleteGroupConsults(ids: number[]): Promise<void> {
        const query = { id: { in: ids } }
        await db.groupConsult.deleteMany({ where: query })
    }
}

export const groupConsultService = new GroupConsultService()
