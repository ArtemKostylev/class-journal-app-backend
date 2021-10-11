class RequestFailureError extends Error {
  constructor(requestName) {
    super(`Unknown error occurred while performing ${requestName} request`);
  }
}

module.exports = { RequestFailureError };
