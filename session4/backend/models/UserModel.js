const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  name: String,
  password: { type: String, select: false }
});

module.exports = mongoose.model("User", UserSchema);
