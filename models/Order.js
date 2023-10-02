const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema({
  userId: { type: schema.Types.ObjectId, ref: "User" },
  products: [{ type: schema.Types.ObjectId, ref: "Product" }],
  totalPrice: Number,
});

module.exports = Order = mongoose.model("Order", orderSchema);
