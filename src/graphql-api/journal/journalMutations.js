const updateJournal = async (parent, args, context, info) => {
  console.log(
    `[DEBUG]: Started journal update process for user ${context.userId}`
  );

  const { updateCasual, updatePeriod, deleteCasual, deletePeriod } = args.data;

  console.log("[DEBUG]: updateCasual", updateCasual);
  console.log("[DEBUG]: updatePeriod", updatePeriod);
  console.log("[DEBUG]: deleteCasual", deleteCasual);
  console.log("[DEBUG]: deletePeriod", deletePeriod);

  const updateCasualValues = await Promise.all(
    updateCasual.map((entry) => {
      return context.prisma.journalEntry.upsert({
        where: {
          id: entry.id,
        },
        update: {
          mark: entry.mark,
          date: entry.date,
        },
        create: {
          mark: entry.mark,
          date: entry.date,
          relationId: entry.relationId,
        },
      });
    })
  );

  console.log("[DEBUG]: updatedCasualValues", updateCasualValues);

  let ids = deleteCasual.map((id) => parseInt(id));

  const deleteRepl = context.prisma.replacement.deleteMany({
    where: {
      entryId: {
        in: ids,
      },
    },
  });

  const deleteMark = context.prisma.journalEntry.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  await context.prisma.$transaction([deleteRepl, deleteMark]);

  console.log("[DEBUG]: deletedRepl", deleteRepl);
  console.log("[DEBUG]: deletedMark", deleteMark);

  const updatePeriodValues = await Promise.all(
    updatePeriod.map((mark) => {
      return context.prisma.quaterMark.upsert({
        where: {
          id: mark.id,
        },
        update: {
          mark: mark.mark,
        },
        create: {
          mark: mark.mark,
          period: mark.period,
          year: mark.year,
          relationId: mark.relationId,
        },
      });
    })
  );

  console.log("[DEBUG]: updatedPeriodValues", updatePeriodValues);

  let qids = deletePeriod.map((id) => parseInt(id));

  const deletedPeriod = await context.prisma.quaterMark.deleteMany({
    where: {
      id: {
        in: qids,
      },
    },
  });

  console.log("[DEBUG]: deletedPeriod", deletedPeriod);
  console.log(
    `[DEBUG]: journal update process for user ${context.userId} completed`
  );
};

module.exports = { updateJournal };
