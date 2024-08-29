// Topbar.jsx
import React,{useState, useEffect} from 'react';
import '../css/Topbar.css';
import logoLight from '../images/logo-light.png';
import logoSm from '../images/logo-sm.png';
import logoDark from '../images/logo-dark.png';
import avatar4 from '../images/users/avatar-4.jpg'
import flagUs from '../images/flags/us.jpg'
import flaggermany from '../images/flags/germany.jpg'
import flagItaly from '../images/flags/italy.jpg'
import flagSpain from '../images/flags/spain.jpg'
import flagRussia from '../images/flags/russia.jpg'
import { MdSearch } from 'react-icons/md';
import { FiUser, FiSettings, FiLock, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { MdNotifications } from 'react-icons/md';
import { MdMenu } from 'react-icons/md';  

const Topbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
          setIsFullscreen(!!document.fullscreenElement);
        };
    
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
        // Cleanup event listener on component unmount
        return () => {
          document.removeEventListener('fullscreenchange', handleFullscreenChange);
          document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
          document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
          document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
      }, []);
    
      const toggleFullscreen = () => {
        if (!isFullscreen) {
          openFullscreen();
        } else {
          closeFullscreen();
        }
      };
    
      const openFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
          elem.msRequestFullscreen();
        }
      };
    
      const closeFullscreen = () => {
        if (document.fullscreenElement) { // Check if the document is in fullscreen mode
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
          }
        }
      };


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? 'light-theme' : 'dark-theme';
  };

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  return (
    <div className="navbar-custom">
      <div className="topbar">
        <div className="topbar-menu d-flex align-items-center gap-lg-2 gap-1">
          {/* Brand Logo */}
          <div className="logo-box">
            <a href="index.html" className="logo-light">
              <img src={logoLight} alt="logo" className="logo-lg" height="22" />
              <img src={logoSm} alt="small logo" className="logo-sm" height="22" />
            </a>

            <a href="index.html" className="logo-dark">
              <img src={logoDark} alt="dark logo" className="logo-lg" height="22" />
              <img src={logoSm} alt="small logo" className="logo-sm" height="22" />
            </a>
          </div>

          {/* Sidebar Menu Toggle Button */}
          <button className="button-toggle-menu" onClick={toggleMenu}>
      <MdMenu size={24} />  {/* Replacing <i> tag with MdMenu component */}
    </button>
        </div>

        <ul className="topbar-menu d-flex align-items-center gap-4">
          {/* Fullscreen Button */}
          <li className="d-none d-md-inline-block">
      <a className="nav-link" href="#" onClick={toggleFullscreen}>
        <MdFullscreen className="size-30" />
      </a>
    </li>
          {/* Search Dropdown */}
          <li className="dropdown">
      <a
        className="nav-link  waves-effect waves-light arrow-none"
        data-bs-toggle="dropdown"
        href="#"
        role="button"
        aria-haspopup="false"
        aria-expanded="false"
      >
        <MdSearch className="font-size-24" size={28}/> {/* Replaced with react-icon */}
      </a>
      <div className="dropdown-menu dropdown-menu-animated dropdown-menu-end dropdown-lg p-0">
        <form>
          <input
            type="search"
            className="form-control"
            placeholder="Search ..."
            aria-label="Search"
            
          />
        </form>
      </div>
    </li>

          {/* Language Dropdown */}
          <li className="dropdown d-none d-md-inline-block">
            <a className="nav-link dropdown-toggle waves-effect waves-light arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
              <img src={flagUs} alt="user-image" className="me-0 me-sm-1" height="18" />
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated">
              <a href="javascript:void(0);" className="dropdown-item">
                <img src={flaggermany} alt="user-image" className="me-1" height="12" /> <span className="align-middle">German</span>
              </a>
              <a href="javascript:void(0);" className="dropdown-item">
                <img src={flagItaly} alt="user-image" className="me-1" height="12" /> <span className="align-middle">Italian</span>
              </a>
              <a href="javascript:void(0);" className="dropdown-item">
                <img src={flagSpain} alt="user-image" className="me-1" height="12" /> <span className="align-middle">Spanish</span>
              </a>
              <a href="javascript:void(0);" className="dropdown-item">
                <img src={flagRussia} alt="user-image" className="me-1" height="12" /> <span className="align-middle">Russian</span>
              </a>
            </div>
          </li>

          {/* Notifications Dropdown */}
          <li className="dropdown notification-list">
      <a
        className="nav-link dropdown-toggle waves-effect waves-light arrow-none"
        data-bs-toggle="dropdown"
        href="#"
        role="button"
        aria-haspopup="false"
        aria-expanded="false"
      >
        <MdNotifications className="font-size-24" size={25} />
        <span className="badge bg-danger rounded-circle noti-icon-badge">9</span>
      </a>
      <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
        <div className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
          <div className="row align-items-center">
            <div className="col">
              <h6 className="m-0 font-size-16 fw-semibold">Notification</h6>
            </div>
            <div className="col-auto">
              <a href="#" className="text-dark text-decoration-underline">
                <small>Clear All</small>
              </a>
            </div>
          </div>
        </div>

        <div className="px-1" style={{ maxHeight: '300px', overflowY: 'auto' }} data-simplebar>
          <h5 className="text-muted font-size-13 fw-normal mt-2">Today</h5>
          {/* Add your notification items here */}
        </div>

        {/* View All Link */}
        <a href="#" className="dropdown-item text-center text-primary notify-item border-top border-light py-2">
          View All
        </a>
      </div>
    </li>

          {/* Theme Mode Toggle */}
          <li className="nav-link" id="theme-mode" onClick={toggleTheme}>
            {isDarkMode ? <FiSun className="font-size-24" /> : <FiMoon className="font-size-24" />}
          </li>

          {/* User Profile Dropdown */}
          <li className="dropdown nav-user">
            <a
                className="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
            >
                <img src={avatar4} alt="user-profile" className="rounded-circle" />
                <span className="ms-1 d-none d-md-inline-block">
                    Jamie D. 
                </span>
            </a>
            <div className="dropdown-menu dropdown-menu-end profile-dropdown">
                <div className="dropdown-header noti-title">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                </div>
                <a href="#" className="dropdown-item notify-item">
                    <i className="fe-user"></i>
                    <span>My Account</span>
                </a>
                <a href="#" className="dropdown-item notify-item">
                    <i className="fe-settings"></i>
                    <span>Settings</span>
                </a>
                <a href="/" className="dropdown-item notify-item">
                    <i className="fe-lock"></i>
                    <span>Lock Screen</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="/" className="dropdown-item notify-item">
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
