const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: String,
  points: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Post", PostSchema);
