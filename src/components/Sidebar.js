import React, { useState } from "react";
import "../css/Sidenavbar.css";
import { FaHome } from "react-icons/fa";
import logoLight from "../images/logo-light.png";
import logoSm from "../images/logo-sm.png";
import { FaUserShield } from "react-icons/fa";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <React.Fragment>
      <div className="main-menu">
        <div className="logo-box">
          <a href="dashboard" className="logo-light">
            <img src={logoLight} alt="logo" className="logo-lg" height="28" />
            <img
              src={logoSm}
              alt="small logo"
              className="logo-sm"
              height="28"
            />
          </a>

          <a href="dashboard" className="logo-dark">
            <img
              src={logoLight}
              alt="dark logo"
              className="logo-lg"
              height="28"
            />
            <img
              src={logoSm}
              alt="small logo"
              className="logo-sm"
              height="28"
            />
          </a>
        </div>

        <div data-simplebar>
          <ul className="app-menu">
            <li className="menu-title">Menu</li>

            <li className="menu-item">
              <a
                href="dashboard"
                className="menu-link waves-effect waves-light"
              >
                <span className="menu-icon">
                  <FaHome color="#cedce4" /> {/* Apply color as needed */}
                </span>
                <span className="menu-text">Dashboards</span>
                <span className="badge bg-primary rounded ms-auto">01</span>
              </a>
            </li>

            <li className="menu-title">Admin</li>

            {/* <li className="menu-item">
                                <a href="apps-calendar.html" className="menu-link waves-effect waves-light">
                                    <span className="menu-icon">
                                        <FaCalendarAlt color="#cedce4" />
                                    </span>
                                    <span className="menu-text">Calendar</span>
                                </a>
                            </li> */}

            <li className="menu-item">
              <a
                href="#menuExpages"
                data-bs-toggle="collapse"
                className="menu-link waves-effect waves-light"
                onClick={toggleMenu}
              >
                <span className="menu-icon">
                  <FaUserShield color="#cedce4" />
                </span>
                <span className="menu-text">Administration</span>
                <span className="menu-arrow">
                  {isOpen ? (
                    <FaChevronDown color="#cedce4" />
                  ) : (
                    <FaChevronRight color="#cedce4" />
                  )}
                </span>
              </a>

              <div className="collapse" id="menuExpages">
                <ul className="sub-menu">
                  <li className="menu-item">
                    <a href="tenants" className="menu-link">
                      <span className="menu-text">Tenants</span>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="organizations" className="menu-link">
                      <span className="menu-text">Organization</span>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="roles" className="menu-link">
                      <span className="menu-text">Roles</span>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="users" className="menu-link">
                      <span className="menu-text">Users</span>
                    </a>
                  </li>
                  <li className="menu-item">
                    <Link to="/permissions" className="menu-link">
                      <span className="menu-text">Permissions</span>
                    </Link>
                  </li>
                 
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
