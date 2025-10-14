const validator = require("validator");

const validateSignupData = (data) => {
  const { firstName, lastName, email, password } = data;
  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please provide all required fields");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email!!");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

const validateProfileEditData = (data) => {
  const allowedEdits = [
    "firstName",
    "lastName",
    "bio",
    "photoUrl",
    "skills",
    "age",
    "gender",
  ];
  const requestedEdits = Object.keys(data);
  let isEditAllowed = requestedEdits.every((edit) =>
    allowedEdits.includes(edit)
  );
  if(data.skills.length > 10) {
    throw new Error("Skills cannot exceed 10 items");
  }
  return isEditAllowed;
};

module.exports = { validateSignupData, validateProfileEditData };
