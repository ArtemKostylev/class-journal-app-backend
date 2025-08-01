const {getFreezeVersion} = require('../../queryUtils/getFreezeVersion');

const fetchJournal = async (parent, args, context) => {
    const {userId} = context;

    const dateGte = args.date_gte || `${args.year}-09-01T00:00:00.000Z`;
    const dateLte = args.date_lte || `${args.year + 1}-05-31T00:00:00.000Z`;

    const freezeVersion = await getFreezeVersion(args.year, context.prisma);

    const students = await context.prisma.teacher_Course_Student.findMany({
        where: {
            teacherId: args.teacherId,
            courseId: args.courseId,
            archived: false,
            freezeVersionId: freezeVersion
        },
        include: {
            journalEntry: {
                orderBy: {
                    date: "asc",
                },
                where: {
                    date: {
                        gte: dateGte,
                        lte: dateLte,
                    },
                },
            },
            quaterMark: {
                where: {
                    year: args.year
                }
            },
            student: true,
        },
    });

    const hours = await context.prisma.teacher_Course_Student.findMany({
        where: {
            teacherId: args.teacherId,
            courseId: args.courseId,
            archived: false,
            freezeVersionId: freezeVersion
        },
        select: {
            journalEntry: {
                where: {
                    date: {
                        gte: `${args.year}-09-01T00:00:00.000Z`,
                        lte: `${args.year + 1}-05-31T00:00:00.000Z`,
                    },
                },
            },
        },
    });

    return students.map((student, index) => ({
        ...student,
        hours: hours[index].journalEntry.length,
    }));
};

const fetchTeacherStudents = async (parent, args, context) => {

    const freezeVersion = await getFreezeVersion(args.year, context.prisma);
    const data = await context.prisma.teacher_Course_Student.findMany({
        where: {
            teacherId: args.teacherId,
            freezeVersionId: freezeVersion
        },
        select: {
            student: true
        }
    });

    return data.map(it => it.student);
}

module.exports = {
    fetchJournal,
    fetchTeacherStudents
}