const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cartSchema = new schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: { type: schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
});

module.exports = Cart = mongoose.model("Cart", cartSchema);
