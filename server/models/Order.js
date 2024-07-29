const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  seedPackage: [
    {
      type: Schema.Types.ObjectId,
      ref: "SeedPackage",
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
