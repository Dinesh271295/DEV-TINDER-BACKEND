const { Schema, model } = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate: {
        validator: (value) => {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid email format");
          }
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          if (!validator.isStrongPassword(value)) {
            throw new Error("Password is not strong enough");
          }
        },
      },
    },
    age: {
      type: Number,
      validate: {
        validator: (value) => {
          if (value < 18) {
            throw new Error("Age must be at least 18");
          }
        },
      },
    },
    gender: {
      type: String,
      validate: {
        validator: (value) => {
          const allowedGenders = ["male", "female", "other"];
          if (!allowedGenders.includes(value.toLowerCase())) {
            throw new Error("gender is invalid!!");
          }
        },
      },
    },
    bio: {
      type: String,
      maxLength: 250,
      default: "This is a default bio",
    },
    photourl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPnb_I_OQt7Mcts15Kf9qwVchNCE7SJlkfYQ&s",
      validate: {
        validator: (value) => {
          if (!validator.isURL(value)) {
            throw new Error("Invalid URL format for photourl");
          }
        },
      },
    },
    skills: {
      type: [String],
      validate: {
        validator: (value) => {
          if (!Array.isArray(value) || value.length > 10) {
            throw new Error("Skills must be an array with maximum 10 skills");
          }
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "dev_tinder_secret_key", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (inputPassword) {
  const user = this;
  const passwordHash = user.password;
  return await bcrypt.compare(inputPassword, passwordHash);
};

const User = model("User", userSchema);

module.exports = { User };
