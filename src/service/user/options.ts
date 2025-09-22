import { db } from '~/db'
import type { DropdownOption } from '~/dto/shared/dropdownOption'

export async function getUserOptions(): Promise<DropdownOption[]> {
    const users = await db.user.findMany({
        where: {
            deleted: false,
        },
        select: {
            id: true,
            login: true,
        },
    })

    return users.map((it) => ({
        value: String(it.id),
        text: it.login,
    }))
}
