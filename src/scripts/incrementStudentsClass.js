const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

prisma.student.updateMany({
    data: {
        class: {
            increment: 1
        }
    }
});