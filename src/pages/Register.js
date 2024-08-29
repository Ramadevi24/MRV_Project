import React from 'react';
import logoDark from '../images/logo-dark.png'
import { Link } from 'react-router-dom';

const Register = () => {
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
                      <img src={logoDark} alt="" height="22" />
                    </span>
                  </Link>
                                </div>
                                <form action="#">
                                    <div className="form-group mb-3">
                                        <label className="form-label" htmlFor="name">Name</label>
                                        <input className="form-control" type="text" id="name" required placeholder="Enter your Name" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label" htmlFor="emailaddress">Email address</label>
                                        <input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <Link to="pages-recoverpw.html" className="text-muted float-end"><small></small></Link>
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input className="form-control" type="password" required id="password" placeholder="Enter your password" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="">
                                            <input className="form-check-input" type="checkbox" id="checkbox-signin" defaultChecked />
                                            <label className="form-check-label ms-2" htmlFor="checkbox-signin">I accept <a href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>
                                    <div className="form-group mb-0 text-center">
                                        <button className="btn btn-primary w-100" type="submit">Sign Up</button>
                                    </div>
                                </form>
                            </div> 
                        </div> 

                        <div className="row mt-3">
                            <div className="col-12 text-center">                        
                                <p className="text-white-50">Already have an account? <Link to="/" className="text-white font-weight-medium ms-1" style={{textDecoration:'none'}}>Log In</Link></p>
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
        </div>
    );
}

export default Register;
