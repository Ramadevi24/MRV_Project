import React, { useState } from "react";
import "../../css/Login.css";
import logo from "../../images/Logoimage.png";
import Uaeimage from "../../images/Uaepass.png";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useAuth } from "../../contexts/AuthContext.jsx";

const Loginpage = ({ setUserPermissions }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = (response) => {
    console.log("Login Success:", response);
    // Handle the response, e.g., send the token to your backend for verification
  };

  const handleFailure = (error) => {
    console.error("Login Failed:", error);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    try {
      const response = await fetch("https://atlas.smartgeoapps.com/MRVAPI/api/Authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: encryptedPassword }),
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        if (data.token) {
          setUserPermissions(data);
          localStorage.setItem("AuthToken", data.token);
          login(data.token);
          navigate("/dashboard");
        } else {
          setError("Token not found in response");
        }
      } else {
        const errorMessage = await response.text(); // Capture error from API
        setError(errorMessage || "Invalid login credentials");
      }
    } catch (err) {
      setError(err.message || "An error occurred during login.");
    }    
  };



  return (
    <div className="login-container">
      <div className="login-left">
        <div className="left-cnt">
          <h1>#No. 1 Monitoring for UAE Environment Portals</h1>
          <p>
            Our company has been ranked as the number one
            <br /> environment monitoring system in the UAE!
          </p>
        </div>
      </div>
      <div className="login-right d-flex flex-column">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="login-form d-flex flex-column align-items-center justify-content-center">
          {/* <img
                src="https://yourlogo.com/logo.png"
                alt="Company Logo"
                className="company-logo"
              /> */}
          <h2>Login</h2>
          <div className="input-feilds">
            <label>User Name</label>
            <input
              type="text"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
               type="password"
               placeholder="Password"
               className="input-field"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               onKeyDown={(e) => {
                 if (e.key === 'Enter') {
                   handleLogin(e); // Pass the event to handleLogin when Enter is pressed
                 }
               }}
          
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="login-button"  onClick={handleLogin}>
            Login
          </button>
          <div className="login-links">
            <div>
              <a href="/signup">
                Don't you have account?{" "}
                <span className="signuplink">Signup</span>
              </a>
            </div>
            <div className="forgot-password">
              <a href="/">
                <span className="forgotpass-link">Forgot Password?</span>
              </a>
            </div>
          </div>

          <p className="or">or</p>
          <button className="uae-pass-button">
            Login With UAE PASS
            <img src={Uaeimage} alt="uaepass" />
          </button>
          <div
            style={{ marginTop: "10px", width: "100%", borderRadius: "15px" }}
          >
            <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
