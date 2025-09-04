const fetchStudents = async (parent, args, context) => {
    return await context.prisma.student.findMany({
        where: {
            freezeVersionId: null,
        },
    })
}

module.exports = {
    fetchStudents,
}
