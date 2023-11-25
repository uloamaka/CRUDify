const { HttpError } = require("");

function errorLogger(err, req, res, next) {
  if (err instanceof HttpError === false) console.log(err.message);
  next(err);
}

function errorHandler(err, req, res, next) {
  const isInvalidJSON =
    err instanceof SyntaxError &&
    "boby" in err &&
    err.message.toLocaleLowerCase().includes("json");

  if (isInvalidJSON) {
    return res.error(400, err.message, "INVALID_JSON_FORMAT");
  }

  if (err instanceof HttpError) {
    return res.error(err.statusCode, err.message, err.errorCode);
  }

  if (err.code === 11000) {
    res.error(400, "Resource Already Exists,", err.errorCode);
  }

  res.error(500, "Something happened, try again!", "UNEXPECTED_ERRORE");
}

module.exports = { errorHandler, errorLogger };
