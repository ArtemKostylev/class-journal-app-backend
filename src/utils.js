const jwt = require("jsonwebtoken");
const { NotAuthenticatedError } = require("./errors/authErrors");
const { RequestFailureError } = require("./errors/sharedErrors");

const APP_SECRET = "dev-secret-1488"; //TODO change secret on prod

const getUserId = (req) => {
  if (!req) {
    throw new RequestFailureError("auth");
  }

  const header = req.headers.authorization;

  if (!header) {
    return null;
  }

  const token = header.replace("Bearer ", "");

  const { userId } = jwt.verify(token, APP_SECRET);

  if (!userId) {
    throw new NotAuthenticatedError();
  }

  return userId;
};

const buildGroups = ({ data, createValue, createKey, groupedName }) => {
  const groups = new Map();

  data.forEach((item) => {
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

    const mappedDates = GROUP_PERIODS[period]();

    const result = [];

    dates.forEach((date) => {
      const month = date.split("T")[0].split("-")[1];
      mappedDates.set(month, [...mappedDates.get(month), date]);
    });

    mappedDates.forEach((value, key) => {
      const maxDates = key === 0 ? 4 : 5;
      const emptyCount = maxDates - value.length;
      result.push([...result.get(key), ...Array(emptyCount).fill("")]);
    });

    return { group: group.group, dates: result };
  });
};

module.exports = {
  APP_SECRET,
  getUserId,
  buildGroups,
  buildDatesByGroup,
};
