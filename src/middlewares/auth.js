const authHandler = (req, res, next) => {
  if (req.originalUrl === "/admin/login") {
    next();
    return;
  }
  console.log("Authenticating user..."); // Shows /admin
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

module.exports = { authHandler, errorHandler };
