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

module.exports = {
  APP_SECRET,
  getUserId,
};
