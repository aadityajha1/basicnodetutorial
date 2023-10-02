const productController = require("../modules/Product/productController");

const router = require("express").Router();

router.post("/", productController.addProduct);

module.exports = router;
