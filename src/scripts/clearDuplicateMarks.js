const { PrismaClient } = require("@prisma/client");
const dropRight = require("lodash/dropRight");

const clearDuplicateMarks = async () => {
  const prisma = new PrismaClient();

  const entries = await prisma.journalEntry.findMany();

  const mappedEntries = new Map();

  entries.forEach((entry) => {
    const key = `${entry.date} ${entry.relationId}`;
    mappedEntries.set(key, [...(mappedEntries.get(key) || []), entry.id]);
  });

  mappedEntries.forEach((value, key) => {
    if (value.length > 1) {
      value.sort(function (a, b) {
        return a - b;
      });
      dropRight(value).forEach(async (it) => {
        const deletedReplacements = await prisma.replacement.deleteMany({
          where: {
            entryId: it,
          },
        });
        console.log(deletedReplacements);
        const deleted = await prisma.journalEntry.delete({
          where: {
            id: it,
          },
        });
        console.log(deleted);
      });
    }
  });

  return true;
};

clearDuplicateMarks();

return 0;
