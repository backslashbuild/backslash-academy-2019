const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const { requireAuth, createToken } = require("./authenticate2");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
