const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProductSchema = new schema({
  name: { type: string },
  quantity: { type: Number },
  price: Number,
});

module.exports = Product = mongoose.model("Product", ProductSchema);
