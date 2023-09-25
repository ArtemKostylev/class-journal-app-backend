import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.student.updateMany({
    where: {
        freezeVersionId: null
    },
    data: {
        class: {
            increment: 1
        }
    }
}).then(res => console.log(res));