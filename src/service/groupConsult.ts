import type { Program } from '@prisma/client'
import { db } from '../db'
import { freezeVersionService } from './freezeVersion'

interface ConsultDto {
    consultId: number
    date: string
    hours: number
    year: number
}

interface GroupConsultDto {
    program: Program
    subgroup: number
    class: number
    consults: ConsultDto[]
}

interface UpdateGroupConsultParams {
    groups: GroupConsultDto[]
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
    consult: {
        id: number
        date: string
        hours: number
    }[]
}

export class GroupConsultService {
    public async updateGroupConsults(params: UpdateGroupConsultParams): Promise<void> {
        const { groups, teacher, course } = params

        await Promise.all(
            groups.map(
                async (group) =>
                    await Promise.all(
                        group.consults.map((consult) =>
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
                                    program: group.program,
                                    subgroup: group.subgroup,
                                    class: group.class,
                                },
                            })
                        )
                    )
            )
        )
    }

    public async getAllGroupConsults(
        params: GetAllGroupConsultsParams
    ): Promise<GetAllGroupConsultsReturnValue[]> {
        const { teacherId, courseId, year } = params

        const freezeVersion = await freezeVersionService.getByYear(year)

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

        let consultsByGroups = new Map()

        allConsults.forEach((item) => {
            const key = `${item.class} ${item.program} ${item.subgroup || '...'}`

            const value = {
                id: item.id,
                date: item.date,
                hours: item.hours,
            }

            if (consultsByGroups.has(key)) {
                consultsByGroups.set(key, [...consultsByGroups.get(key), value])
            } else {
                consultsByGroups.set(key, [value])
            }
        })

        return Array.from(availableGroupsSet).map((group) => {
            if (consultsByGroups.has(group)) return { group, consult: consultsByGroups.get(group) }
            return { group, consult: [] }
        })
    }

    public async deleteGroupConsults(ids: number[]): Promise<void> {
        const query = { id: { in: ids } }
        await db.groupConsult.deleteMany({ where: query })
    }
}

export const groupConsultService = new GroupConsultService()