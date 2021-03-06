const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
     {
          userId: { type: String, required: true},
          products: [
               {
                    productId:{
                         type:String
                    },
                    quantity:{
                         type: Number,
                         default: 1,
                    },
               },
          ],
          amount: { type: Number, required: true},
          address: { type: Object, required: ture },
          status: { type: String, default: "pending" },
     },
     { timestamps: true}
);

module.exports = mogoose.model("Order", orderSchema);