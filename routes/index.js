const router = require("express").Router();

const userRoutes = require("./users");
router.use("/users", userRoutes);

const productRoutes = require("./products");
router.use("/products", productRoutes);

module.exports = router;
