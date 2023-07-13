const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const database = mongoose.createConnection(
  process.env.MONGO_URI
);

const questionSchema = new Schema({
  questionname: {
    type:String,
    required: [true,"Please enter a Question Name"],
  },
  questiondescription: {
    type: String,
    required: [true, "Please enter a Question"],
  },
  id:{
    type:Number
  }
});

const questionModel = database.model("questions", questionSchema);

module.exports = questionModel;
