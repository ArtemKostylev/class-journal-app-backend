class NotAuthenticatedError extends Error {
  constructor() {
    super("Not authenticated");
  }
}

module.exports = { NotAuthenticatedError };
