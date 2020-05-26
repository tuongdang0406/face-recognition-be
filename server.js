const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = {
  users: [
    {
      id: "1",
      name: "Alice",
      email: "alice@gmail.com",
      password: "alice",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "2",
      name: "Bob",
      email: "bob@gmail.com",
      password: "bob",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.json(db.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === db.users[0].email &&
    req.body.password === db.users[0].password
  ) {
    res.json(db.users[0]);
  } else {
    res.status(400).json("fail");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  db.users.push({
    id: "3",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(db.users[db.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  db.users.map((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) res.status(404).json("no such user");
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  db.users.map((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
