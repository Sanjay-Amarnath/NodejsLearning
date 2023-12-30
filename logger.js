const log = (req, res, next) => {
  console.log("logging...");
  next();
};

const auth = (req, res, next) => {
  console.log("Authentication...");
  next();
};

module.exports = log;
// module.exports = auth;
