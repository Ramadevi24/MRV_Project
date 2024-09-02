import React, { useState } from "react";
import "../css/Sidenavbar.css";
import { FaHome, FaUserShield, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logoImage from "../images/Logoimage.png";
import logoSm from "../images/logo-sm.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Set to true to keep the dropdown open by default
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <div className="main-menu">
        <div className="logo-box">
          <img src={logoImage} alt="logo" />
        </div>

        <div data-simplebar>
          <ul className="app-menu">
            <li className="menu-title">Menu</li>

            <li className="menu-item">
              <Link to="/dashboard" className="menu-link waves-effect waves-light">
                <span className="menu-icon">
                  <FaHome color="#cedce4" />
                </span>
                <span className="menu-text">Dashboards</span>
                <span className="badge bg-primary rounded ms-auto">01</span>
              </Link>
            </li>

            <li className="menu-title">Admin</li>

            <li className={`menu-item ${isOpen ? "open" : ""}`}>
              <div
                href="#menuExpages"
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
              </div>

              <div className={`collapse ${isOpen ? "show" : ""}`} id="menuExpages">
                <ul className="sub-menu">
                  <li className={`menu-item ${location.pathname === "/tenants" ? "active" : ""}`}>
                    <Link to="/tenants" className="menu-link">
                      <span className="menu-text">Tenants</span>
                    </Link>
                  </li>
                  <li className={`menu-item ${location.pathname === "/organizations" ? "active" : ""}`}>
                    <Link to="/organizations" className="menu-link">
                      <span className="menu-text">Organization</span>
                    </Link>
                  </li>
                  <li className={`menu-item ${location.pathname === "/roles" ? "active" : ""}`}>
                    <Link to="/roles" className="menu-link">
                      <span className="menu-text">Roles</span>
                    </Link>
                  </li>
                  <li className={`menu-item ${location.pathname === "/users" ? "active" : ""}`}>
                    <Link to="/users" className="menu-link">
                      <span className="menu-text">Users</span>
                    </Link>
                  </li>
                  <li className={`menu-item ${location.pathname === "/permissions" ? "active" : ""}`}>
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
