const fetchReplacements = async (parent, args, context) => {
    const {userId} = context;

    const freezeVersion = await context.prisma.freezeVersion.findFirst({
        where: {
            year: args.year
        }
    }) || null

    return await context.prisma.teacher_Course_Student.findMany({
        where: {
            teacherId: args.teacherId,
            courseId: args.courseId,
            archived: false,
            freezeVersion: freezeVersion
        },
        include: {
            journalEntry: {
                orderBy: {
                    date: "asc",
                },
                where: {
                    date: {
                        gte: args.date_gte,
                        lte: args.date_lte,
                    },
                    mark: {
                        in: ["Б"],
                    },
                },
                include: {
                    replacement: true,
                },
            },
            student: true,
        },
    });
};

module.exports = {
    fetchReplacements
}