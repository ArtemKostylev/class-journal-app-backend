import { GROUP_PERIODS } from "./constants";

interface Resolver {
  resolvers: {
    Query: any,
    Mutation: any,
  }
}

export function mergeResolvers(resolvers: Resolver[]) {
  return resolvers.reduce((acc, resolver) => {
    return {
      Query: {
        ...acc.Query,
        ...resolver.resolvers.Query,
      },
      Mutation: {
        ...acc.Mutation,
        ...resolver.resolvers.Mutation,
      },
    };
  }, {
    Query: {},
    Mutation: {},
  });
}

const getMonthFromUTCString = (date: string) => {
  return date.split("T")[0].split("-")[1];
};

const buildGroups = ({ data, createValue, createKey, groupedName }: any) => {
  const groups = new Map();

  data.forEach((item: any) => {
    const key = createKey(item);

    const value = createValue(item);

    groups.set(key, groups.has(key) ? [...groups.get(key), value] : [value]);
  });

  const result: any[] = [];

  groups.forEach((value, key) =>
    result.push({ group: key, [groupedName]: value })
  );

  return result;
};

const buildDatesByGroup = (data: any, period: any) => {
  const resultData = {
    dates: [] as any[],
    students: [] as any[],
  };
  data.forEach((group: any) => {
    const dates = [
      ...new Set(
        group.students
          .map((student: any) => {
            student.journalEntry.map((item: any) => item.date);
          })
          .flat()
      ),
    ];

    const mappedDates = period();

    const result: any[] = [];

    dates.forEach((date: any) => {
      if (date) {
        const month = getMonthFromUTCString(date);
        mappedDates.set(month, [...mappedDates.get(month), date]);
      }
    });

    mappedDates.forEach((value: any, key: any) => {
      const maxDates = key === 0 ? 4 : 5;
      const emptyCount = maxDates - value.length;
      result.push([...value, ...Array(emptyCount).fill("")]);
    });

    resultData.dates.push({ group: group.group, dates: result });
    resultData.students.push(group);
  });

  return resultData;
};

const getPeriod = (date: string) => {
  return parseInt(getMonthFromUTCString(date)) > 8
    ? GROUP_PERIODS.FIRST_HALF
    : GROUP_PERIODS.SECOND_HALF;
};

export {
  buildGroups,
  buildDatesByGroup,
  getPeriod,
  getMonthFromUTCString,
};
