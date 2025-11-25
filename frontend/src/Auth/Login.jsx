import React, { useState } from "react";
import "./Auth.css";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);

  return (
   <div className="page-bg">
  <div className={`main-box ${isRegister ? "active" : ""}`}>

    {/* LEFT SIDE - WHITE BOX */}
    <div className="left-box">

      {/* LOGIN FORM */}
      <div className="form-box login">
        <h1>Login</h1>
        <input type="email" placeholder="Enter Email" />
        <input type="password" placeholder="Enter Password" />
        <button className="red-btn">Login</button>
        <p className="switch">
          Don’t have an account? <span onClick={() => setIsRegister(true)}>Register</span>
        </p>
      </div>

      {/* REGISTER FORM */}
      <div className="form-box register">
        <h1>Create Account</h1>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Enter Email" />
        <input type="password" placeholder="Enter Password" />
        <button className="red-btn">Register</button>
        <p className="switch">
          Already have an account? <span onClick={() => setIsRegister(false)}>Login</span>
        </p>
      </div>

    </div>

    {/* RIGHT SIDE PANEL */}
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
</div>

  );
}
