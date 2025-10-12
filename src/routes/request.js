const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    console.log("connection request sent to target Id");
    res.send("Connection request sent successfully");
  } catch (err) {
    res.status(500).send("Error sending connection request: " + err.message);
  }
});

module.exports = { requestRouter };