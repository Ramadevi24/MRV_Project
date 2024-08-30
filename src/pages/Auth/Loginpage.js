import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Login.css';
import logo from '../../images/Logoimage.png';
import Uaeimage from '../../images/Uaepass.png';


const Loginpage = () => {
    return (
        <div className="login-container">
          <div className="login-left">
            <div className='left-cnt'>
            <h1>#No. 1 Monitoring for UAE Environment Portals</h1>
            <p>
              Our company has been ranked as the number one<br /> environment monitoring
              system in the UAE!
            </p>
            </div>
          </div>
          <div className="login-right d-flex flex-column">
            <div className='logo'>
              <img src={logo} />
            </div>
            <div className="login-form d-flex flex-column align-items-center justify-content-center">
              {/* <img
                src="https://yourlogo.com/logo.png"
                alt="Company Logo"
                className="company-logo"
              /> */}
              <h2>Login</h2>
              <div className='input-feilds'>
              User Name
              <input type="text" placeholder="User Name" className="input-field" />
              Password
              <input
                type="password"
                placeholder="Password"
                className="input-field"
              />
              </div>
              <button className="login-button">Login</button>
              <div className="login-links">
                <div>
                <a href="/signup">Don't you have account? <span className='signuplink'>Signup</span></a>
                </div>
                <div className='forgot-password'>
                <a href="/forgot-password"><span className='forgotpass-link'>Forgot Password?</span></a>
                </div> 
              </div>
             
              <p className='or'>or</p>
              <button className="uae-pass-button">Login With UAE PASS 
                <img src={Uaeimage} alt='uaepass' />
                </button>
               
              
            </div>
          </div>
        </div>
      );
    };
     

export default Loginpage;
