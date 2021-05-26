const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    lastname: String,
    email: String,
    birthday: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
