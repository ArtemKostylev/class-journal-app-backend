import { db } from '~/db'
import type { OffsetResponse } from '~/dto/shared/offsetResponse'
import type { GetTeacherListRequestDto } from '~/dto/teacher/getTeacherList/request'
import type { GetTeacherListResponseDto } from '~/dto/teacher/getTeacherList/response'

export async function getTeacherList(params: GetTeacherListRequestDto): Promise<OffsetResponse<GetTeacherListResponseDto>> {
    const { offset, limit } = params

    const teachers = await db.teacher.findMany({
        where: {
            freezeVersionId: null,
            deleted: false,
        },
        orderBy: {
            id: 'asc',
        },
        skip: offset,
        take: limit,
        select: {
            id: true,
            name: true,
            surname: true,
            parent: true,
            user: true,
        },
    })

    const rows = teachers.map((teacher) => {
        return {
            id: teacher.id,
            name: teacher.name,
            surname: teacher.surname,
            parent: teacher.parent,
            user: teacher.user
                ? {
                      value: String(teacher.user.id),
                      text: teacher.user.login,
                  }
                : undefined,
        }
    })

    return {
        rows,
        nextOffset: teachers.length === limit ? offset + limit : undefined,
    }
}
