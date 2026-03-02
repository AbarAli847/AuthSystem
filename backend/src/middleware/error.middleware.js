const errorHandler = (err, req, res, next) => {
  console.log("Error : ", err);

  let statusCode = console.error.statusCode || 500;
  let message = err.message || "Internal server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};


module.exports = errorHandler;