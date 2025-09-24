const validator = require("validator");

const validateSignupData = (data) => {
    const {firstName, lastName, email, password} = data;
    if(!firstName || !lastName || !email || !password) {
        throw new Error("Please provide all required fields");
    }

    if(!validator.isEmail(email)) {
        throw new Error("Invalid email!!");
    }

    if(!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }
}

module.exports = { validateSignupData };