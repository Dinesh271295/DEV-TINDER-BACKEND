const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  // add user to database
  try {
    const userData = {
      firstName: "Virat",
      lastName: "Kohli",
      email: "virat@kohli.com",
      password: "123456asdfs",
      age: 36,
      gender: "male",
    };
    const user = new User(userData);
    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(400).send("Error creating user");
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
