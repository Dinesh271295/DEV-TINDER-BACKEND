const express = require("express");
const {validateSignupData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const validator = require("validator");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  // add user to database
  try {
    //validate the signup data
    validateSignupData(req.body);
    //encrypt the password
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    //save the user to database
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!validator.isEmail(trimmedEmail)) {
      return res.status(400).send("Invalid email format.");
    }

    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).send("Invalid credentials.");
    }

    const isPasswordMatch = await user.validatePassword(trimmedPassword);
    if (!isPasswordMatch) {
      return res.status(401).send("Invalid credentials.");
    }
    // If credentials are valid, create a JWT token
    const token = user.getJWT();

    res.cookie("token", token);
    res.status(200).send("User logged in successfully");
  } catch (err) {
    res.status(500).send("Error logging in user: " + err.message);
  }
});

module.exports = { authRouter };