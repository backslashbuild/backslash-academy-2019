const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const port = 5000;

const posts = [
  {
    id: 1,
    title: "Consectetur anim sunt fugiat ipsum fugiat ipsum elit eiusmod in aliquip aute elit qui quis.",
    author: "Steven",
    points: 40
  },
  {
    id: 2,
    title: "Consectetur anim sunt fugiat ipsum fugiat ipsum elit eiusmod in aliquip aute elit qui quis.",
    author: "Josh",
    points: 48
  }
];

app.get("/", (req, res) => res.send(posts));

app.get("/foo", (req, res) => res.send("bar!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
