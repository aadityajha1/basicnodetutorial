const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const cartController = {};

cartController.addToCart = async (req, res) => {
  const products = req.body.products; // [{productID: 1241, quantity: 123}]
  const userId = req.body.userId;
  if (!Array.isArray(products)) throw new Error(`Products must be an array`);
  let finalProds = [];
  const prodIds = products.map((p) => p.id);
  for (let product of products) {
    const prodExists = await Product.findOne({ _id: product.id });
    if (!prodExists) throw new Error(`Product does not exist`);
    if (prodExists.quantity < product.quantity)
      throw new Error(`Product ${prodExists.name} is out of stock`);

    finalProds.push({ productId: prodExists._id, quantity: product.quantity });
  }

  const prevCart = await Cart.findOne({ userId });
  if (prevCart) {
    const existingProds = prevCart.products.filter((p) =>
      prodIds.includes(p._id)
    );
    if (existingProds.length) {
      for (let prod of existingProds) {
        const index = prevCart.products.indexOf(
          (p) => p._id === prod.productId
        );
        prevCart.products[index].quantity = finalProds.filter(
          (p) => p._id === prod.productId
        );
      }
    }
    const existingProdIDs = existingProds.map((p) => p._id);
    const remainingProds = finalProds.filter(
      (p) => !existingProdIDs.includes(p._id)
    );
    prevCart.products.push(...remainingProds);

    await prevCart.save();
    return res.json({ message: "Added to cart", data: prevCart });
  } else {
    const newCart = new Cart({ userId, products: finalProds });
    await newCart.save();
    return res.json({ message: "Added to cart", data: newCart });
  }
};

module.exports = cartController;
