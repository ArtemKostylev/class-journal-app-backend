import type { OffsetResponse } from '~/dto/shared/offsetResponse'
import { UserListRequestDto } from '~/dto/user/list/request'
import { UserListResponseDto } from '~/dto/user/list/response'
import { db } from '~/db'

export async function getUserList(params: UserListRequestDto): Promise<OffsetResponse<UserListResponseDto>> {
    const { offset, limit } = params

    const users = await db.user.findMany({
        skip: offset,
        take: limit,
        orderBy: {
            id: 'asc',
        },
        select: {
            id: true,
            login: true,
            roleId: true,
        },
    })

    const nextOffset = users.length === limit ? offset + limit : undefined

    return {
        rows: users.map((user) => ({
            id: user.id,
            login: user.login,
            role: user.roleId,
        })),
        nextOffset,
    }
}
