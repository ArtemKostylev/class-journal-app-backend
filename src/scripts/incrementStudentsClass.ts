import { db } from '../db'

db.student
    .updateMany({
        where: {
            freezeVersionId: null,
        },
        data: {
            class: {
                increment: 1,
            },
        },
    })
    .then((res) => console.log(res))
