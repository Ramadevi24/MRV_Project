import React from 'react';
import '../css/Login.css';
import logo from '../images/Logoimage.png';
import Uaeimage from '../images/Uaepass.png';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
let Signup=()=>
{
    const navigate = useNavigate();
    const handleSuccess = (response) => {
      console.log('Login Success:', response);
      // Handle the response, e.g., send the token to your backend for verification
    };
  
    const handleFailure = (error) => {
      console.error('Login Failed:', error);
    };
  
    const handleLogin = (e) => {
        e.preventDefault();
        // Add your form submission logic here, such as validation or API calls
        // For example, after successful registration, navigate to the login page:
        navigate('/Mrv/dashboard');
    };
    return(
        <div>
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
              <h2>Sign Up</h2>
              <div className='input-feilds'>
              User Name
              <input type="text" placeholder="User Name" className="input-field" />
              Email 
              <input type="email" placeholder="Email" className="input-field" />
              Password
              <input
                type="password"
                placeholder="Password"
                className="input-field"
              />
              Confirm Password
              <input type="text" placeholder="Confirm Password" className="input-field" />
        
              </div>
              <button className="login-button" onClick={handleLogin}>Signup</button>
              <div className="login-links">
                {/* <div>
                <a href="/signup">Don't you have account? <span className='signuplink'>Signup</span></a>
                </div> */}
                {/* <div className='forgot-password'>
                <a href="/"><span className='forgotpass-link'>Forgot Password?</span></a>
                </div>  */}
              </div>
             
              <p className='or'>or</p>
              <button className="uae-pass-button">Sign Up With UAE PASS 
                <img src={Uaeimage} alt='uaepass' />
                </button>
                <div style={{marginTop:'10px', width:'100%', borderRadius:'15px'}}>
                <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
      />
      </div>
              
            </div>
          </div>
        </div>
        </div>
    )
}
export default Signup;