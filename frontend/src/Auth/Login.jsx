import React, { useState } from "react";
import "./Auth.css";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);

  // form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({ name: "", email: "", password: "" });

  // messages
  const [loginMsg, setLoginMsg] = useState("");
  const [registerMsg, setRegisterMsg] = useState("");

  const navigate = useNavigate();

  // Handle login input
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle register input
  const handleRegisterChange = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  // LOGIN API
  const handleLogin = async () => {
    setLoginMsg("");    
    try {
      // FIXED URL
      const res = await API.post("/auth/login", loginData);

      localStorage.setItem("token", res.data.token);

      // FIXED NAVIGATION
      navigate("/home");
    } catch (err) {
      setLoginMsg(err.response?.data?.msg || "Login failed");
    }
  };

  // REGISTER API
  const handleRegister = async () => {
    setRegisterMsg("");  
    try {
      // FIXED URL
      const res = await API.post("/auth/register", regData);

      localStorage.setItem("pendingName", regData.name);
      localStorage.setItem("pendingEmail", regData.email);
      localStorage.setItem("pendingPassword", regData.password);

      navigate("/verify-otp");
    } catch (err) {
      setRegisterMsg(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <>
      <div className="page-bg"></div>
      <div className={`main-box ${isRegister ? "active" : ""}`}>

        <div className="glass-container">

          {/* LOGIN FORM */}
          <div className="form-box login">
            <h1>Login</h1>

            <input 
              type="email" 
              name="email" 
              placeholder="Enter Email"
              onChange={handleLoginChange} 
            />

            <input 
              type="password" 
              name="password" 
              placeholder="Enter Password"
              onChange={handleLoginChange} 
            />

            {loginMsg && <p className="error-msg">{loginMsg}</p>}

            <button className="red-btn" onClick={handleLogin}>Login</button>

            <p className="switch">
              Don’t have an account? 
              <span onClick={() => setIsRegister(true)}>Register</span>
            </p>
          </div>

          {/* REGISTER FORM */}
          <div className="form-box register">
            <h1>Create Account</h1>

            <input 
              type="text" 
              name="name" 
              placeholder="Full Name"
              onChange={handleRegisterChange} 
            />

            <input 
              type="email" 
              name="email" 
              placeholder="Enter Email"
              onChange={handleRegisterChange} 
            />

            <input 
              type="password" 
              name="password" 
              placeholder="Enter Password"
              onChange={handleRegisterChange} 
            />

            {registerMsg && <p className="error-msg">{registerMsg}</p>}

            <button className="red-btn" onClick={handleRegister}>Register</button>

            <p className="switch">
              Already have an account? 
              <span onClick={() => setIsRegister(false)}>Login</span>
            </p>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="right-box">
          <div className="panel-content left">
            <h2>Welcome Back</h2>
            <p>Login to continue your movie journey.</p>
          </div>

          <div className="panel-content right">
            <h2>Hello User!</h2>
            <p>Create an account to explore movies & series.</p>
          </div>
        </div>

      </div>
    </>
  );
}
