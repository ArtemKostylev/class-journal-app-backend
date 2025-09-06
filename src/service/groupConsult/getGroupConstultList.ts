import type { GetGroupConsultListRequestDto } from '~/dto/groupConsult/getGroupConsultList/request'
import { getVersionByYear } from '../freezeVersion'
import type { GetGroupConsultListResponseDto } from '~/dto/groupConsult/getGroupConsultList/response'
import { db } from '~/db'
import { DATE_FORMAT } from '~/const/dateFormat'
import { format } from 'date-fns'
import { Program } from '@prisma/client'

interface GroupConsultMapped {
    id: number
    date: string
    hours: number
    class: number
    program: Program
    subgroup: number | null
}

export async function getGroupConsultList(params: GetGroupConsultListRequestDto): Promise<GetGroupConsultListResponseDto[]> {
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
        availableGroups.map((item) => `${item.student?.class} ${item.student?.program} ${item.subgroup || '...'}`)
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
            date: format(item.date, DATE_FORMAT),
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
