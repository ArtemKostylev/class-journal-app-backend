const fetchStudents = async (parent, args, context) => {
    return await context.prisma.student.findMany();
};

module.exports = {
    fetchStudents
}