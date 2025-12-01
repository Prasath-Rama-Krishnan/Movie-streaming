import React, { useState, useRef, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./Otp.css";

export default function OtpVerify() {
  const navigate = useNavigate();
  const email = localStorage.getItem("pendingEmail");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);         // 30 seconds timer
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // TIMER HANDLER
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  // OTP Box Change Handler
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  // Verify OTP API
  const verifyOtp = async () => {
    try {
      const finalOtp = otp.join("");

      const res = await API.post("/verify-otp", {
        email,
        otp: finalOtp,
      });

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid OTP");
    }
  };

  // RESEND OTP FUNCTION
  const resendOtp = async () => {
    try {
      await API.post("/resend-otp", { email });

      setTimer(30);
      setCanResend(false);

      alert("New OTP has been sent!");
    } catch (err) {
      alert("Error sending OTP");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-box">
        <h2>Verify OTP</h2>
        <p>OTP sent to</p>
        <h3>{email}</h3>

        {/* OTP INPUT ROW */}
        <div className="otp-input-group">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              maxLength="1"
              type="text"
              className="otp-six-box"
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              ref={(el) => (inputRefs.current[idx] = el)}
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}
        <button className="verify-btn" onClick={verifyOtp}>
          Verify OTP
        </button>

        {/* RESEND OTP SECTION */}
        <div style={{ marginTop: "15px", color: "white", fontSize: "15px" }}>
          {canResend ? (
            <span
              style={{ color: "#ff4d4d", cursor: "pointer", fontWeight: "bold" }}
              onClick={resendOtp}
            >
              Resend OTP
            </span>
          ) : (
            <span>Resend in {timer}s</span>
          )}
        </div>
      </div>
    </div>
  );
}
