import {PrismaClient} from '@prisma/client';

export const getFreezeVersion = async (year: number, prisma: PrismaClient) => {
  const freezeVersion = await prisma.freezeVersion.findFirst({
    where: {
      year
    }
  });

  return freezeVersion?.id || null;
}