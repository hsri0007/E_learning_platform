const asyncHandler = require("express-async-handler");
const Stripe = require("stripe");
const User = require("../models/userModel");

const stripe = Stripe(process.env.stripe_secret_key);

const createConnectAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).exec();

  // if (!user.stripe_account_id) {
  // const account = await stripe.accounts.create({
  //   type: "express",
  // });
  // user.stripe_account_id = account.id;
  // user.save();
  // }

  // let accountLink = await stripe.accountLinks.create({
  //   account: user.stripe_account_id,
  //   refresh_url: process.env.stripe_red,
  //   return_url: stripe_red,
  //   type: "account_onboarding",
  // });

  // accountLink = Object.assign({
  //   "stripe_user[email]": user.email || undefined,
  // });

  console.log(accountLink, "acc link");

  //   res.status(200).json({
  //     id: _id,
  //     name,
  //     email,
  //   });
});

module.exports = {
  createConnectAccount,
};
