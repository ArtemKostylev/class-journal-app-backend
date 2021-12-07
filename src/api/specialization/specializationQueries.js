const fetchSpecialization = async (parent, args, context) => {
  const { userId } = context;
  return await context.prisma.specialization.findMany();
};

module.exports = {
  fetchSpecialization,
};
