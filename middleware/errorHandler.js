const errorHandeler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    messgae: err.message || "Internal server error",
  });
};

module.exports = errorHandeler;
