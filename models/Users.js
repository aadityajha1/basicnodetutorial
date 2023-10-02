const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema(
  {
    name: String,
    phone: String,
    age: Number,
    role: {
      type: String,
      enum: ["admin", "viewer", "editor"],
      default: "viewer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
