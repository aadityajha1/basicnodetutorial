const Users = require("../../models/Users");

const userController = {};

userController.getAllUSers = async (req, res) => {
  const users = await Users.find({});

  return res.json({ message: "Users fetched successfully", data: users });
};

userController.create = async (req, res) => {
  const user = new Users({ ...req.body });

  return res.json({ message: "User created successfully", data: user });
};

module.exports = userController;
