const updateGroupCompany = async (parent, args, context, info) => {
  await Promise.all(
    args.data.map((item) =>
      context.prisma.courseHours.upsert({
        where: {
          id: item.id,
        },
        update: {
          date: item.date,
          hours: item.hours,
        },
        create: {
          courseId: item.courseId,
          teacherId: item.teacherId,
          class: item.class,
          program: item.program,
          subgroup: item.subgroup,
          date: item.date,
          hours: item.hours,
        },
      })
    )
  );
};

const deleteGroupCompany = async (parent, args, context, info) => {
  let ids = args.ids.map((id) => parseInt(id));

  await context.prisma.courseHours.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
};

module.exports = {
  updateGroupCompany,
  deleteGroupCompany,
};
