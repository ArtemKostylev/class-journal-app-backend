import { db } from '../../db'

export async function getVersionByYear(year: number) {
    return await db.freezeVersion.findFirst({ where: { year } })
}
