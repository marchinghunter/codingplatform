const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const database = mongoose.createConnection(
  process.env.MONGO_URI
);
const testcaseSchema = new Schema({
  id: Number,
  input: String,
  output: String,
  judgeId: {
    type: Number,
    default: 1,
  },
  timeLimit: {
    type: Number,
    default: 5,
  },
});

const testcaseModel = database.model("testcase", testcaseSchema);

module.exports = testcaseModel;
