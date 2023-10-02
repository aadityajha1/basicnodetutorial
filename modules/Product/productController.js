const Product = require("../../models/Product");

const productController = {};

productController.addProduct = async (req, res) => {
  const newProduct = new Product({ ...req.body });

  await newProduct.save();

  return res.json({ message: "Product added successfully", data: newProduct });
};

module.exports = productController;
