const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  title: String,
  points: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
});

module.exports = mongoose.model("Comment", CommentSchema);
