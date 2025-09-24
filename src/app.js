const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  // add user to database
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(400).send("Error creating user" + err.message);
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
      "skills"
    ];
    const isUpdateAllowed = Object.keys(req.body).every((update) =>
      updatesAllowed.includes(update)
    );
    if(!isUpdateAllowed) {
      throw new Error("Invalid updates!");
    }

    if(req.body.skills.length > 10) {
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
