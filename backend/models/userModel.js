const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
