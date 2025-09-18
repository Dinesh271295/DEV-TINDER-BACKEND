const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://venkatadineshposa_db_user:ZCx4FfRGP0PjEP1C@exploremongodb.yjugekz.mongodb.net/dev-tinder");
}

module.exports = { connectDB };