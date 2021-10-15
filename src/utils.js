const jwt = require("jsonwebtoken");
const { NotAuthenticatedError } = require("./errors/authErrors");
const { RequestFailureError } = require("./errors/sharedErrors");
const { GROUP_PERIODS } = require("./constants");

const getMonthFromUTCString = (date) => {
  return date.split("T")[0].split("-")[1];
};

const getUserId = (req) => {
  if (!req) {
    throw new RequestFailureError("auth");
  }

  const header = req.headers.authorization;

  if (!header) {
    return null;
  }

  const token = header.replace("Bearer ", "");

  const { userId } = jwt.verify(token, process.env.APP_SECRET);

  if (!userId) {
    throw new NotAuthenticatedError();
  }

  return userId;
};

const buildGroups = ({ data, createValue, createKey, groupedName }) => {
  const groups = new Map();

  data.forEach((item) => {
    console.log(item);
    const key = createKey(item);

    const value = createValue(item);

    groups.set(key, groups.has(key) ? [...groups.get(key), value] : [value]);
  });

  const result = [];

  groups.forEach((value, key) =>
    result.push({ group: key, [groupedName]: value })
  );

  return result;
};

const buildDatesByGroup = (data, period) => {
  return data.map((group) => {
    const dates = [
      ...new Set(
        group.students
          .map((student) => {
            student.journalEntry.map((item) => item.date);
          })
          .flat()
      ),
    ];

    const mappedDates = period;

    const result = [];

    dates.forEach((date) => {
      if (date) {
        const month = getMonthFromUTCString(date);
        mappedDates.set(month, [...mappedDates.get(month), date]);
      }
    });

    mappedDates.forEach((value, key) => {
      const maxDates = key === 0 ? 4 : 5;
      const emptyCount = maxDates - value.length;
      result.push([...result.get(key), ...Array(emptyCount).fill("")]);
    });

    return { group: group.group, dates: result };
  });
};

const getPeriod = (date) => {
  return getMonthFromUTCString(date) > 8
    ? GROUP_PERIODS.FIRST_HALF
    : GROUP_PERIODS.SECOND_HALF;
};

module.exports = {
  getUserId,
  buildGroups,
  buildDatesByGroup,
  getPeriod,
  getMonthFromUTCString,
};
