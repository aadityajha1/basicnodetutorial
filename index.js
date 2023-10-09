// console.log(`Hello world`);
// mongodb+srv://aadityajha:6nZ6zdGgWXp71yFO@cluster0.x5of7yi.mongodb.net/?retryWrites=true&w=majority
const express = require("express");
const app = express();
const port = 8000;
const users = require("./users.json");
const fs = require("fs");
const products = require("./products.json");
const orders = require("./orders.json");
const mongoose = require("mongoose");
const User = require("./models/Users");
const indexRouter = require("./routes/index");
const basicAuthentication = require("./middleware.js/basicAuthentication");
const jwtBasedAuthentication = require("./middleware.js/jwtAuthentication");
app.use(express.json());
app.get("/", (req, res) => {
  res.send(`Hello world`);
});

const connectDB = async () => {
  const connect = mongoose.connect(
    `mongodb+srv://aadityajha2000:alUcKZXDKdfOSRdC@cluster0.5pgoikv.mongodb.net/?retryWrites=true&w=majority`
  );
  await connect.then(
    (db) => {
      console.log(`Mongoose connected successfully`);
    },
    (err) => {
      console.log(`Mongoose failed to connect`, err);
    }
  );
};

connectDB();
// alUcKZXDKdfOSRdC
app.use("/api", indexRouter);
app.get("/users", async (req, res) => {
  // console.log(newUser);
  res.status(200).json(users);
});

app.use(jwtBasedAuthentication);

app.get("/users/:id", (req, res) => {
  const user = users.filter((user) => user.id.toString() === req.params.id);
  if (!user) {
    return res.status(404).send(`User not found`);
  }
  return res.json(user);
});

app.post("/users/create", basicAuthentication, async (req, res) => {
  // const newUser = req.body;
  const { name, phone, age, role } = req.body;
  console.log(newUser);
  const newUser = new User({ name, phone, age, role });
  await newUser.save();

  return res
    .status(200)
    .json({ message: "User created successfully", newUser });
  // const updatedData = [...users, newUser];
  // fs.writeFile(
  //   "users.json",
  //   JSON.stringify(updatedData, null, 2),
  //   "utf8",
  //   (err, data) => {
  //     if (err) {
  //       return res.status(400).send(err);
  //     }
  //     res.send(`User created successfully`);
  //   }
  // );
});

app.put("/api/users/:id", async (req, res) => {
  const user = await User.findOne({ id: req.params.id });
  if (!user) throw new Error(`User not found`);
  const newUser = req.body;
  user = {
    ...newUser,
    ...user,
  };
  user.save();
});

app.delete("/api/users/:id", async (req, res) => {
  const user = await User.findOneAndDelete({ id: req.params.id });
  // if (!user) throw new Error(`User not found`);
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
