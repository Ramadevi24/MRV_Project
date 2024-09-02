import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logoimage from '../images/Logoimage.png'
import { GoogleLogin } from '@react-oauth/google';



const LoginPage = () => {
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
      navigate('/dashboard');
  };
  
  const handlesignup=(e)=>
  {
    e.preventDefault();
    navigate('/signup');
  }
  return (
    <div className="bg-primary d-flex justify-content-center align-items-center min-vh-100 p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-md-5">
            <div className="card">
              <div className="card-body p-4">
                <div className="text-center w-75 mx-auto auth-logo mb-4">
                  <Link to="index.html" className="logo-dark">
                    <span>
                      <img src={Logoimage} alt="" height="22" />
                    </span>
                  </Link>
                  {/* <Link to="index.html" className="logo-light">
                    <span>
                      <img src={logolight} alt="" height="22" />
                    </span>
                  </Link> */}
                </div>

                <form action="#">
                  <div className="form-group mb-3">
                    <label className="form-label" htmlFor="emailaddress">Email address</label>
                    <input
                      className="form-control"
                      type="email"
                      id="emailaddress"
                      required
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <a href="pages-recoverpw.html" className="text-muted float-end">
                      <small></small>
                    </a>
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      id="password"
                      required
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <div className="">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="checkbox-signin"
                        defaultChecked
                      />
                      <label className="form-check-label ms-2" htmlFor="checkbox-signin">Remember me</label>
                    </div>
                  </div>

                  <div className="form-group mb-0 text-center">
                    <button className="btn btn-primary w-100" type="submit" onClick={handleLogin}>Log In</button>
                  </div>
                  <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
      />
                </form>
              </div> {/* end card-body */}
            </div> {/* end card */}

            <div className="row mt-3">
              <div className="col-12 text-center">
                <p className="text-white-50">
                  <Link to="/register" className="text-white-50 ms-1 " style={{textDecoration:'none'}}>Forgot your password?</Link>
                </p>
                <p className="text-white-50">
                  Don't have an account? <Link to="/register" className="text-white font-weight-medium ms-1" style={{textDecoration:'none'}} onClick={handlesignup}>Sign Up</Link>
                </p>
              </div> {/* end col */}
            </div> {/* end row */}

          </div> {/* end col */}
        </div> {/* end row */}
      </div>
    </div>
  );
};

export default LoginPage;
