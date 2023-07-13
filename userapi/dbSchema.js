const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const database = mongoose.createConnection(
  process.env.MONGO_URI
);

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter an name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
  },
  role: {
    type: String,
    required: [true, "Please enter an role"],
  },
});

//Hashing password before saving it into database using Bcrypt
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const userModel = database.model("users", userSchema);

module.exports = userModel;
