const userController = require("../modules/User/userController");

const router = require("express").Router();

router.get("/", userController.getAllUSers);

router.post("/", userController.create);
router.post("/login", userController.login);

module.exports = router;
