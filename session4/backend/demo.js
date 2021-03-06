require("dotenv").config();
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

// npm install --save mongoose dotenv
const { UserModel, PostModel, CommentModel } = require('./models');

const { requireAuth, createToken } = require("./authenticate");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

app.get('/create-demo-user', async (req, res) => {
  const newUser = new UserModel({ 
    name: 'mr test',
    username: 'test',
    password: 'psasword'
  })

  await newUser.save();

  res.send({ success: true })
})

app.get('/get-all-users', async (req, res) => {
  
  const users = await UserModel.find({});
    res.send({
    users
  })
})



const posts = [
  {
    id: 1,
    title:
      "Consectetur anim sunt fugiat ipsum fugiat ipsum elit eiusmod in aliquip aute elit qui quis.",
    author: "Steven",
    points: 40
  },
  {
    id: 2,
    title:
      "Consectetur anim sunt fugiat ipsum fugiat ipsum elit eiusmod in aliquip aute elit qui quis.",
    author: "Josh",
    points: 48
  }
];

const comments = [
  {
    id: 1,
    title:
      "Consectetur anim sunt fugiat ipsum fugiat ipsum elit eiusmod in aliquip aute elit qui quis.",
    author: "Steven",
    points: 5
  },
  {
    id: 2,
    title:
      "Consectetur anim sunt fugiat ipsum fugiat ipsum elit eiusmod in aliquip aute elit qui quis.",
    author: "Josh",
    points: 3
  }
];



app.get("/", (req, res) => res.send(posts));

app.get("/posts", async (req, res) => {
  const posts = await PostModel.find().populate("author");
  res.send(posts);
});

app.post("/posts", requireAuth, async (req, res) => {
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

app.get("/post/:id", (req, res) => {
  const matchingPosts = posts.filter(p => p.id == req.params.id);
  if (matchingPosts.length > 0) {
    res.send({ ...matchingPosts[0], comments });
  } else {
    res.send({ error: "Post not found." });
  }
});

app.get("/protected", requireAuth, (req, res) => {
  res.send({ message: "This is a protected route, your id is " + req.user });
});

app.get("/createtoken", (req, res) => {
  res.send({
    token: createToken(req.body.userId)
  });
});

let lastId = 0;
const users = [
  {
    id: ++lastId,
    name: "Steven",
    username: "stevenb",
    password: "password"
  }
];

app.get("/get-me", requireAuth, (req, res) => {
  const matchingUser = users.find(u => u.id == req.user);
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
