const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const { User } = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    //corner cases

    //1. cannot send request to self
    if (fromUserId.equals(toUserId)) {
      throw new Error("Connection request can't be sent to yourself !!");
    }

    //2. check if status is valid
    const validStatuses = ["ignored", "interested"];
    if (!validStatuses.includes(status)) {
      throw new Error(`Status can't be of type ${status} !!`);
    }

    //3. check if toUserId exists
    const toUser = await User.findById(toUserId);
    console.log(toUser);
    if (!toUser) {
      throw new Error(
        "The user you are trying to connect with does not exist !!"
      );
    }

    //4. check if a request already exists between the two users
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingRequest) {
      throw new Error(
        `A connection request already sent to ${toUser.firstName} ${toUser.lastName}!!`
      );
    }

    // Create a new connection request object
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    // save to database
    const savedRequest = await connectionRequest.save();
    res.status(200).json({
      message: `${req.user.firstName} ${req.user.lastName} ${
        status === "interested" ? "is" : ""
      } ${status} ${status == "interested" ? "in" : ""} ${toUser.firstName} ${
        toUser.lastName
      }`,
      request: savedRequest,
    });
  } catch (err) {
    res.status(500).json({
      message: "connection request is not sent!!",
      error: err.message,
    });
  }
});

requestRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const loggededInUser = req.user;
    const { status, requestId } = req.params;

    // check if status is valid
    const validStatuses = ["accepted", "rejected"];
    if (!validStatuses.includes(status)) {
      throw new Error(`Status can't be of type ${status} !!`);
    }

    // find the connection request
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggededInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      throw new Error("No pending connection request found !!");
    }

    // update the status
    connectionRequest.status = status;
    const updatedRequest = await connectionRequest.save();
    res.status(200).json({
      message: `Connection request ${status} successfully !!`,
      data: updatedRequest,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

module.exports = { requestRouter };
