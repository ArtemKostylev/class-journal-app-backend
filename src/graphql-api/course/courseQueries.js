const fetchCourses = async (parent, args, context) => {
    return await context.prisma.course.findMany({
        where: {
            freezeVersionId: null,
        },
    })
}
module.exports = { fetchCourses }
