const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

await prisma.student.updateMany({
    data: {
        class: {
            increment: 1
        }
    }
});