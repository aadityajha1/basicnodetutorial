// console.log(`Hello world`);

const express = require("express");
const app = express();
const port = 5000;
const users = require("./users.json");
const fs = require("fs");

app.use(express.json());
app.get("/", (req, res) => {
  res.send(`Hello world`);
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.filter((user) => user.id.toString() === req.params.id);
  if (!user) {
    return res.status(404).send(`User not found`);
  }
  return res.json(user);
});

app.post("/users/create", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  const updatedData = [...users, newUser];
  fs.writeFile(
    "users.json",
    JSON.stringify(updatedData, null, 2),
    "utf8",
    (err, data) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.send(`User created successfully`);
    }
  );
});

app.listen(port, (req, res) => {
  console.log(`app listening on ${port}`);
});
