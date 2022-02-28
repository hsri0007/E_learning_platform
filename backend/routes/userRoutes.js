const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  createConnectAccount,
  getAccountStatus,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/stripe", protect, createConnectAccount);
router.post("/stripeaccountstatus", protect, getAccountStatus);

module.exports = router;
