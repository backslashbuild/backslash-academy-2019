require("dotenv").config();
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const { requireAuth, createToken } = require("./authenticate");
const asyncMiddleware = require("./asyncMiddleware");
const { UserModel, PostModel, CommentModel } = require("./models");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.postAsync = (route, ...handlers) => app.post(route, ...handlers.map(h => asyncMiddleware(h)));
app.getAsync = (route, ...handlers) => app.get(route, ...handlers.map(h => asyncMiddleware(h)));

const port = 5000;

app.getAsync("/reset", async (req, res) => {
  const { UserModel, PostModel } = require("./models");
  await PostModel.deleteMany({});
  await UserModel.deleteMany({});
  res.sendStatus(204);
});

app.getAsync("/posts", async (req, res) => {
  const posts = await PostModel.find().populate("author");
  res.send(posts);
});

app.getAsync("/posts/:id", async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (post) {
    const comments = await CommentModel.find({ post: post._id });
    res.send({ ...post.toJSON(), comments });
  } else {
    res.send({ error: "Post not found." });
  }
});

app.postAsync("/posts", requireAuth, async (req, res) => {
  const matchingUser = await UserModel.findById(req.user);

  const { title } = req.body;

  const newPost = new PostModel({
    title,
    points: 0,
    author: matchingUser.id
  });

  await newPost.save();

  res.send({
    success: true,
    id: newPost.id
  });
});

app.postAsync("/posts/:postId/comments", requireAuth, async (req, res) => {
  const matchingUser = await UserModel.findById(req.user);
  const { postId } = req.params;

  const matchingPost = await PostModel.findById(postId);

  if (!matchingPost) {
    return res.send({ success: false, message: "post not found" });
  }

  const { title } = req.body;

  const newComment = new CommentModel({
    title,
    points: 0,
    author: matchingUser.id,
    post: matchingPost.id
  });

  await newComment.save();

  res.send({
    success: true,
    id: newComment.id
  });
});

app.getAsync("/get-me", requireAuth, async (req, res) => {
  const matchingUser = await UserModel.findById(req.user);

  if (matchingUser) {
    const { id, username, name } = matchingUser;

    return res.send({ id, username, name });
  }

  res.send(null);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const matchingUser = await UserModel.findOne({ username }).select("+password");

  console.log({ matchingUser });

  if (matchingUser && matchingUser.password == password) {
    res.send({
      success: true,
      token: createToken(matchingUser.id)
    });
  } else {
    res.send({ success: false, message: "invalid credentials" });
  }
});

app.post("/register", async (req, res) => {
  const { username, name, password } = req.body;

  const matchingUser = await UserModel.findOne({ username });

  console.log({ matchingUser });

  if (matchingUser) {
    res.send({ success: false, message: "username is taken" });
  } else {
    const newUser = new UserModel({
      username,
      name,
      password
    });
    await newUser.save();

    res.send({ success: true });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
