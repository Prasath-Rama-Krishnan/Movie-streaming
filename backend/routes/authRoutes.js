const express = require("express");
const router = express.Router();

const {
  registerSendOtp,
  verifyOtp,
  loginUser,
  resendOtp
} = require("../controllers/authController");

// Authentication Routes
router.post("/register", registerSendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/resend-otp", resendOtp);

module.exports = router;
