const fetchSpecialization = async (parent, args, context) => {
    return await context.prisma.specialization.findMany({
        where: {
            freezeVersionId: null,
        },
    })
}

module.exports = {
    fetchSpecialization,
}
