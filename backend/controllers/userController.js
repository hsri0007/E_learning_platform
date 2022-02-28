const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const queryString = require("query-string");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.stripe_secret_key);
const User = require("../models/userModel");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const createConnectAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).exec();

  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    });
    user.stripe_account_id = account.id;
    user.save();
  }

  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.stripe_red_url,
    return_url: process.env.stripe_red_url,
    type: "account_onboarding",
  });

  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });

  console.log(`${accountLink.url}?${queryString.stringify(accountLink)}`);

  res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
});
const getAccountStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);

  if (!account.charges_enabled) {
    return res.status(401).send("unauthorized");
  } else {
    await User.findByIdAndUpdate(
      user._id,
      {
        stripe_seller: account,
      },
      {
        new: true,
      }
    );
  }

  res.json(account);
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  createConnectAccount,
  getAccountStatus,
};
