const express = require("express");
const bcrypt = require("bcrypt");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { validateSignupData } = require("./utils/validation");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

    const isPasswordMatch = await bcrypt.compare(
      trimmedPassword,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(401).send("Invalid credentials.");
    }
    // If credentials are valid, create a JWT token
    const token = jwt.sign({ _id: user._id }, "dev_tinder_secret_key");

    res.cookie("token", token);
    res.status(200).send("User logged in successfully");
  } catch (err) {
    res.status(500).send("Error logging in user: " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    // If no token is present, return an unauthorized error
    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }
    // Verify the token
    const decodedMessage = jwt.verify(token, "dev_tinder_secret_key");
    const user = await User.findById(decodedMessage._id);
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Error fetching profile: " + err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const fetchedUsers = await User.findById("68cc49000deb299dc65e8216");
    if (fetchedUsers.length === 0) {
      return res.status(404).send("No users found");
    } else {
      res.status(200).json(fetchedUsers);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error fetching users");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
});

app.patch("/user/:userId", async (req, res) => {
  try {
    const updatesAllowed = [
      "firstName",
      "lastName",
      "bio",
      "password",
      "photourl",
      "userId",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(req.body).every((update) =>
      updatesAllowed.includes(update)
    );
    if (!isUpdateAllowed) {
      throw new Error("Invalid updates!");
    }

    if (req.body.skills.length > 10) {
      throw new Error("Exceeding maximum number of skills allowed");
    }
    const userId = req.params.userId;
    const user = await User.findOne({ _id: userId }, null, {
      sort: { _id: -1 },
    });
    if (user) {
      await User.findByIdAndUpdate(user._id, req.body);
      res.status(200).send("User updated successfully");
    } else {
      res.status(404).send("User not found");
    }
    // await User.findByIdAndUpdate(userId, req.body);
  } catch (err) {
    res.status(500).send("Error updating user" + err.message);
  }
});

// Connect to the database before starting the server
connectDB()
  .then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
