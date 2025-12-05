const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// ------------------------------------------------------
// STEP 1: Register → Send OTP
// ------------------------------------------------------
const registerSendOtp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let existing = await User.findOne({ email });

    if (existing && existing.verified) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Remove old OTP
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({
      email,
      otp,
      name,
      password: hashedPass
    });

    await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}`);

    res.json({ msg: "OTP sent to email" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ------------------------------------------------------
// STEP 2: Verify OTP
// ------------------------------------------------------
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: record.name,
        email,
        password: record.password,
        verified: true
      });
    } else {
      user.password = record.password;
      user.verified = true;
      await user.save();
    }

    await Otp.deleteMany({ email });

    res.json({ msg: "Account verified successfully!" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ------------------------------------------------------
// STEP 3: Login
// ------------------------------------------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Account not found" });

    if (!user.verified)
      return res.status(400).json({ msg: "Email not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.json({
      msg: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ------------------------------------------------------
// STEP 4: Resend OTP
// ------------------------------------------------------
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ msg: "Email required" });

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    let record = await Otp.findOne({ email });

    if (!record) {
      return res.status(400).json({
        msg: "No registration in progress. Please register again."
      });
    }

    record.otp = newOtp;
    record.createdAt = Date.now();
    await record.save();

    await sendEmail(email, "Your New OTP", `Your new OTP is ${newOtp}`);

    res.json({ msg: "New OTP sent successfully" });

  } catch (err) {
    console.log("RESEND OTP ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  registerSendOtp,
  verifyOtp,
  loginUser,
  resendOtp,
};
