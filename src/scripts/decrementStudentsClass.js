const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

prisma.student.updateMany({
    data: {
        class: {
            decrement: 1
        }
    }
}).then(res => console.log(res));