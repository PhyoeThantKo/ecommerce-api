const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
     {
          title: { type: String, required: true, unique: true},
          desc: { type: String, required: true},
          img: { type: String, required: ture },
          categories: { type: Array },
          size: { type: String },
          color: { type: String },
          price: { type: Number, required: ture },
     },
     { timestamps: true}
);

module.exports = mogoose.model("Product", productSchema);