const errorHandler = (err, req, res, next) => {
  let code = 500;
  let msg = "internal server error";
  console.log(err);
  if (err.message === "INVALID_TOKEN" || err.name === "JsonWebTokenError") {
    code = 401;
    msg = "Invalid token";
  } else if (err.message === "NOT_FOUND") {
    code = 404;
    msg = "Item not found";
  } else if (err.message === "CANNOT_EDIT") {
    code = 401;
    msg = "You cannot edit this item";
  } else if (err.message === "FORBIDDEN") {
    code = 403;
    msg = "Forbidden to access source";
  }
  res.status(code).json({ message: msg });
};

module.exports = errorHandler;
