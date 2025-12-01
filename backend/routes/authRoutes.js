import express from "express";
import {
  registerSendOtp,
  verifyOtp,
  loginUser,
  resendOtp
} from "../controllers/authController.js";

const router = express.Router();

// Authentication Routes
router.post("/register", registerSendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/resend-otp", resendOtp);

export default router;
