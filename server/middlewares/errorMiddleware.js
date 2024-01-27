const errorMiddleware = async (err, req, res, next) => {
  const defaultError = {
    statusCode: 500,
    success: "failed",
    message: err,
  };
  console.log(err);
  if (err?.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.message = Object.values(err.errors)
      .map((item = item.message))
      .join(",");
  }
  if (err?.code && err?.code === 11000) {
    defaultError.statusCode = 409; // Conflict
    defaultError.message = `${Object.keys(err.keyPattern).join(
      ", "
    )} must be unique`;
  }

  res?.status(defaultError.statusCode).json({
    success: defaultError.success,
    message: defaultError.message,
  });
};

export default errorMiddleware;
