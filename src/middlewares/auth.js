const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const userAuth = async (req, res, next) => {
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
    req.user = user; // Attach user to request object
    next();
  } catch (err) {
    throw new Error("Authentication failed: " + err.message);
  }
};

module.exports = { userAuth };
