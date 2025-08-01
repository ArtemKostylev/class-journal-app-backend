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
      value.slice(0, value.length - 1).forEach(async (it) => {
        // TODO: try cascade delete
        await prisma.replacement.deleteMany({
          where: {
            entryId: it,
          },
        });
        await prisma.journalEntry.delete({
          where: {
            id: it,
          },
        });
      });
    }
  });

  return true;
};

clearDuplicateMarks();

return 0;
