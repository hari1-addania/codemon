
import ErrorHandler from "../utils/errorhandler.js";

const Error= function(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  if (err.name === "CastError") {
    const msg = "resource not found" + err.path;
    err = new ErrorHandler(msg, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.stack
  });
};

export default Error;