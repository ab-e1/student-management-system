const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const date = new Date().toISOString();

  console.log(`time: ${date} method: ${method} url: ${url}`);

  next();
};

module.exports = logger;
