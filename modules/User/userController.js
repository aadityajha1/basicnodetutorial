const Users = require("../../models/Users");
const jwt = require("jsonwebtoken");
const userController = {};

userController.getAllUSers = async (req, res) => {
  const users = await Users.find({});

  return res.json({ message: "Users fetched successfully", data: users });
};

userController.create = async (req, res) => {
  const user = new Users({ ...req.body });

  return res.json({ message: "User created successfully", data: user });
};

userController.login = async (req, res) => {
  const { username, password } = req.body;

  // database validation code for username and password goes here.

  const token = jwt.sign({ username }, `your-secret-key`, { expiresIn: "1h" });

  res.json({ token, message: "User login successful" });
};

module.exports = userController;
