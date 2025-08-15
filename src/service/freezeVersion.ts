import { db } from "../db";

class FreezeVersionService {
    public async getByYear(year: number) {
        return await db.freezeVersion.findFirst({where: {year}});
    }
}

export const freezeVersionService = new FreezeVersionService();