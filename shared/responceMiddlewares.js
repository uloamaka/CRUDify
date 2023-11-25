const responseUtilities = function (req, res, next) {
  res.ok = (payload, meta) => customOkHelper(payload, meta, res);
  res.created = (payload) => customCreatedHelper(payload, res);
  res.noContent = () => customNoContentHelper(res);
  res.error = (statusCode, message, errCode) =>
    customErrorHelper(res, statusCode, message, errorCode);
  next();
};

function customOkHelper(payload, meta, res) {
  return res.status(200).json({ status: "success", data: payload, meta });
}

function customCreatedHelper(payload, res) {
  return res.status(201).json({ status: "success", data: payload });
}

function customNoContentHelper(res) {
  return res.status(204);
}

function customErrorHelper(res, statusCode, message, errorCode) {
  return res
    .status(statusCode)
    .json({ status: "error", code: errorCode, message });
}

module.exports = responseUtilities;
