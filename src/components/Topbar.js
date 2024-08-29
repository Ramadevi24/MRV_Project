// Topbar.jsx
import React from 'react';
import '../css/Topbar.css';
import logoLight from '../images/logo-light.png';
import logoSm from '../images/logo-sm.png';
import logoDark from '../images/logo-dark.png';

const Topbar = () => {
  return (
    <div className="navbar-custom">
      <div className="topbar">
        <div className="topbar-menu d-flex align-items-center gap-lg-2 gap-1">
          {/* Brand Logo */}
          <div className="logo-box">
            {/* Brand Logo Light */}
            {/* <a href="index.html" className="logo-light">
              <img src={logoLight} alt="logo" className="logo-lg" height="22" />
              <img src={logoSm} alt="small logo" className="logo-sm" height="22" />
            </a> */}

            {/* Brand Logo Dark */}
            <a href="index.html" className="logo-dark">
              <img src={logoDark} alt="dark logo" className="logo-lg" height="22" />
              {/* <img src={logoSm} alt="small logo" className="logo-sm" height="22" /> */}
            </a>
          </div>

          {/* Sidebar Menu Toggle Button */}
          <button className="button-toggle-menu">
            <i className="mdi mdi-menu"></i>
          </button>
        </div>

        <ul className="topbar-menu d-flex align-items-center gap-4">
          {/* Fullscreen Button */}
          <li className="d-none d-md-inline-block">
            <a className="nav-link" href="#" data-bs-toggle="fullscreen">
              <i className="mdi mdi-fullscreen font-size-24"></i>
            </a>
          </li>

          {/* Search Dropdown */}
          <li className="dropdown">
            <a className="nav-link dropdown-toggle waves-effect waves-light arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
              <i className="mdi mdi-magnify font-size-24"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-animated dropdown-menu-end dropdown-lg p-0">
              <form className="p-3">
                <input type="search" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
              </form>
            </div>
          </li>

          {/* Language Dropdown */}
          <li className="dropdown d-none d-md-inline-block">
            <a className="nav-link dropdown-toggle waves-effect waves-light arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
              <img src="../images/flags/us.jpg" alt="user-image" className="me-0 me-sm-1" height="18" />
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated">
              <a href="javascript:void(0);" className="dropdown-item">
                <img src="images/flags/germany.jpg" alt="user-image" className="me-1" height="12" /> <span className="align-middle">German</span>
              </a>
              <a href="javascript:void(0);" className="dropdown-item">
                <img src="images/flags/italy.jpg" alt="user-image" className="me-1" height="12" /> <span className="align-middle">Italian</span>
              </a>
              <a href="javascript:void(0);" className="dropdown-item">
                <img src="images/flags/spain.jpg" alt="user-image" className="me-1" height="12" /> <span className="align-middle">Spanish</span>
              </a>
              <a href="javascript:void(0);" className="dropdown-item">
                <img src="images/flags/russia.jpg" alt="user-image" className="me-1" height="12" /> <span className="align-middle">Russian</span>
              </a>
            </div>
          </li>

          {/* Notifications Dropdown */}
          <li className="dropdown notification-list">
            <a className="nav-link dropdown-toggle waves-effect waves-light arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
              <i className="mdi mdi-bell font-size-24"></i>
              <span className="badge bg-danger rounded-circle noti-icon-badge">9</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
              <div className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
                <div className="row align-items-center">
                  <div className="col">
                    <h6 className="m-0 font-size-16 fw-semibold">Notification</h6>
                  </div>
                  <div className="col-auto">
                    <a href="javascript: void(0);" className="text-dark text-decoration-underline">
                      <small>Clear All</small>
                    </a>
                  </div>
                </div>
              </div>

              <div className="px-1" style={{ maxHeight: '300px' }} data-simplebar>
                <h5 className="text-muted font-size-13 fw-normal mt-2">Today</h5>
                {/* Notification Items */}
                {/* ... repeat notification items here ... */}
              </div>

              {/* View All Link */}
              <a href="javascript:void(0);" className="dropdown-item text-center text-primary notify-item border-top border-light py-2">
                View All
              </a>
            </div>
          </li>

          {/* Theme Mode Toggle */}
          <li className="nav-link" id="theme-mode">
            <i className="bx bx-moon font-size-24"></i>
          </li>

          {/* User Profile Dropdown */}
          <li className="dropdown">
            <a className="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
              <img src="assets/images/users/avatar-4.jpg" alt="user-image" className="rounded-circle" />
              <span className="ms-1 d-none d-md-inline-block">
                Jamie D. <i className="mdi mdi-chevron-down"></i>
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-end profile-dropdown">
              <div className="dropdown-header noti-title">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </div>
              <a href="javascript:void(0);" className="dropdown-item notify-item">
                <i className="fe-user"></i>
                <span>My Account</span>
              </a>
              <a href="javascript:void(0);" className="dropdown-item notify-item">
                <i className="fe-settings"></i>
                <span>Settings</span>
              </a>
              <a href="pages-lock-screen.html" className="dropdown-item notify-item">
                <i className="fe-lock"></i>
                <span>Lock Screen</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="pages-login.html" className="dropdown-item notify-item">
                <i className="fe-log-out"></i>
                <span>Logout</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
