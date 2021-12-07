const updateConsults = async (parent, args, context, info) => {
  return (updatedEntries = args.data.map((consult) => {
    return context.prisma.consult.upsert({
      where: {
        id: consult.id,
      },
      update: {
        date: consult.date,
        hours: consult.hours,
      },
      create: {
        date: consult.date,
        hours: consult.hours,
        relationId: consult.relationId,
        year: consult.year,
      },
    });
  }));
};

const deleteConsults = async (parent, args, context, info) => {
  let ids = args.ids.map((id) => parseInt(id));

  let res = await context.prisma.consult.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
};

const updateGroupConsults = async (parent, args, context, info) => {
  return (updatedEntries = args.data.map((group) => {
    group.consults.map(async (consult) => {
      return await context.prisma.groupConsult.upsert({
        where: {
          id: consult.id,
        },
        update: {
          date: consult.date,
          hours: consult.hours,
        },
        create: {
          date: consult.date,
          year: consult.year,
          teacherId: args.teacher,
          courseId: args.course,
          hours: consult.hours,
          program: group.program,
          subgroup: group.subgroup,
          class: group.class,
        },
      });
    });
  }));
};

const deleteGroupConsults = async (parent, args, context, info) => {
  let ids = args.ids.map((id) => parseInt(id));

  let res = await context.prisma.groupConsult.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
};

module.exports = {
  updateConsults,
  deleteConsults,
  updateGroupConsults,
  deleteGroupConsults
}