// console.log(`Hello world`);

const express = require("express");
const app = express();
const port = 5000;
const users = require("./users.json");
const fs = require("fs");
const products = require("./products.json");
const orders = require("./orders.json");
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

app.get("/order/create", (req, res) => {
  // userid, productid, quantity
  const { userid, productid, quantity } = req.body;
  const product = products.filter((p) => p.id === productid)[0];
  if (!product) throw new Error(`Product not found`);
  if (product.quantity < quantity) throw new Error(`Out of stock`);
  // orderid, productid, quantity, totalprice, datecreated
  const user = users.filter((user) => user.id === userid)[0];
  if (!user) throw new Error(`User not found`);
  const order = {
    userid,
    productid,
    quantity,
    totalPrice: product.price * quantity,
    createdAt: new Date().toISOString(),
  };
  const finalOrdersData = [...orders, order];
  fs.writeFile(
    "orders.json",
    JSON.stringify(finalOrdersData, null, 2),
    "utf8",
    (err, data) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({
        order,
        message: `Order created successfully`,
      });
    }
  );
});

app.listen(port, (req, res) => {
  console.log(`app listening on ${port}`);
});
