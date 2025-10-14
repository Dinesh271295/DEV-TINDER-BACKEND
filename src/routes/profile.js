const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send("Error fetching profile: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    //data sanitization and validation
    const isValidEdit = validateProfileEditData(req.body);
    if (!isValidEdit) {
      throw new Error("Profile edit is not allowed for requested fields");
    }
    const user = req.user;


    // After data is validated, update the user object
    Object.keys(req.body).forEach((field) => {
      user[field] = req.body[field];
    });
    // Save the updated user object to the database
    await user.save();
    const responseData = {
      message: "Profile updated successfully",
      user,
    };
    res.json(responseData);
  } catch (err) {
    res.status(500).send("Error updating profile: " + err.message);
  }
});

module.exports = { profileRouter };
