const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("Route 1");
    // res.send('Hello from route 1');
    next();
  },
  [
    (req, res, next) => {
      console.log("Route 2");
      // res.send('Hello from route 2');
      next();
    },
    (req, res, next) => {
      console.log("Route 3");
      res.send("Hello from route 3");
      next();
    },
  ]
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
