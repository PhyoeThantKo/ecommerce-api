const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
     {
          username: { type: String, required: true, unique: true},
          email: { type: String, required: true, unique: true},
          pasword: { type: String, required: ture, unique: true },
          isAdmin: { type: Boolean, default: false },
     },
     { timestamps: true}
);

module.exports = mogoose.model("User", userSchema);