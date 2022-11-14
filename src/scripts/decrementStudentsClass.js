const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const main = async (tx) => tx.student.updateMany({
    where: {
        NOT: {
            freezeVersionId: null
        }
    },
    data: {
        class: {
            decrement: 1
        }
    }
});

prisma.$transaction(main).then(res => console.log(res));