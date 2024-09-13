// import React, { useState } from "react";
// import "../css/Sidenavbar.css";
// import { FaHome, FaUserShield, FaChevronDown, FaChevronRight } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import logoImage from "../images/Logoimage.png";
// import logoSm from "../images/logo-sm.png";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true); // Set to true to keep the dropdown open by default
//   const location = useLocation();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <React.Fragment>
//       <div className="main-menu">
//         <div className="logo-box">
//           <img src={logoImage} alt="logo" />
//         </div>

//         <div data-simplebar>
//           <ul className="app-menu">
//             <li className="menu-title">Menu</li>

//             <li className="menu-item">
//               <Link to="/dashboard" className="menu-link waves-effect waves-light">
//                 <span className="menu-icon">
//                   <FaHome color="#cedce4" />
//                 </span>
//                 <span className="menu-text">Dashboards</span>
//                 <span className="badge bg-primary rounded ms-auto">01</span>
//               </Link>
//             </li>

//             <li className="menu-title">Admin</li>

//             <li className={`menu-item ${isOpen ? "open" : ""}`}>
//               <div
//                 href="#menuExpages"
//                 className="menu-link waves-effect waves-light"
//                 onClick={toggleMenu}
//               >
//                 <span className="menu-icon">
//                   <FaUserShield color="#cedce4" />
//                 </span>
//                 <span className="menu-text">Administration</span>
//                 <span className="menu-arrow">
//                   {isOpen ? (
//                     <FaChevronDown color="#cedce4" />
//                   ) : (
//                     <FaChevronRight color="#cedce4" />
//                   )}
//                 </span>
//               </div>

//               <div className={`collapse ${isOpen ? "show" : ""}`} id="menuExpages">
//                 <ul className="sub-menu">
//                   <li className={`menu-item ${location.pathname === "/tenants" ? "active" : ""}`}>
//                     <Link to="/tenants" className="menu-link">
//                       <span className="menu-text">Tenants</span>
//                     </Link>
//                   </li>
//                   <li className={`menu-item ${location.pathname === "/organizations" ? "active" : ""}`}>
//                     <Link to="/organizations" className="menu-link">
//                       <span className="menu-text">Organization</span>
//                     </Link>
//                   </li>
//                   <li className={`menu-item ${location.pathname === "/roles" ? "active" : ""}`}>
//                     <Link to="/roles" className="menu-link">
//                       <span className="menu-text">Roles</span>
//                     </Link>
//                   </li>
//                   <li className={`menu-item ${location.pathname === "/users" ? "active" : ""}`}>
//                     <Link to="/users" className="menu-link">
//                       <span className="menu-text">Users</span>
//                     </Link>
//                   </li>
//                   <li className={`menu-item ${location.pathname === "/permissions" ? "active" : ""}`}>
//                     <Link to="/permissions" className="menu-link">
//                       <span className="menu-text">Permissions</span>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Sidebar;


import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../css/AddNewRole.css';
import "../css/Sidenavbar.css";
import logoimage from '../images/Logoimage.png';
import Dashboardicon from '../images/Dashboardicon.png';
import Reportsicon from '../images/ReportIcon.png';
import Datamanagementicon from '../images/DataManagementicon.png';
import Administrationicon from '../images/Administrationicon.png';
import Usersicon from '../images/Usericon.png';
import settingsicon from '../images/Gearicon.png';
import { Link,useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from  '@fortawesome/free-solid-svg-icons';
import {faSitemap} from  '@fortawesome/free-solid-svg-icons';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import {faUserPen} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";

const Sidebar = () => {
    const {t}=useTranslation();
  const [dropdownState, setDropdownState] = useState({

    administration: false
    // help: false,
    // more: false
});

const location = useLocation(); 

// Toggle function
const toggleDropdown = (dropdown) => {
    setDropdownState((prevState) => ({
        ...prevState,
        [dropdown]: !prevState[dropdown]
     
    }));
};
const isActive = (path) => location.pathname === path;
  return (
    <div>
         <div className="col-12 right-container">
                    <aside className="sidebar">
                        <div className="logo">
                            <img src={logoimage} alt="Environment Agency Admin" />
                        </div>
                        <p className='menu-heading'>{t('Main menu')}</p>
                        <nav className="menu">
                            <ul className='sidemenu-items'>
                            <Link to="/dashboard" className="menu-link"><li className={`sidenav-menuitem ${isActive("/dashboard") ? "active-menu" : ""}`}><img src={Dashboardicon} />{t('Dashboard')}</li></Link>
                            <Link to="/datamanagement" className="menu-link"><li className={`sidenav-menuitem ${isActive("/datamanagement") ? "active-menu" : ""}`}><img src={Datamanagementicon} />{t('Data Management')}</li></Link>
                            {/* <Link to="/organizations" className="menu-link"> <li className={`sidenav-menuitem ${isActive("/organizationtable") ? "active-menu" : ""}`}><img src={Dashboardicon} />{t('Organization')}</li></Link>
                            <Link to="/users" className="menu-link">   <li className={`sidenav-menuitem ${isActive("/usersdata") ? "active-menu" : ""}`}><img src={Datamanagementicon} />{t('Users')}</li></Link>
                            <Link to="/tenantsData" className="menu-link"> <li className={`sidenav-menuitem ${isActive("/tenantsData") ? "active-menu" : ""}`}><img src={Dashboardicon} />{t('Tenants')}</li></Link>
                            <Link to="/permissionsData" className="menu-link"> <li className={`sidenav-menuitem ${isActive("/permissionsData") ? "active-menu" : ""}`}><img src={Datamanagementicon} />{t('Permissions')}</li></Link> */}
                               <Link to="/reports" className="menu-link"> <li className={`sidenav-menuitem ${isActive("/reports") ? "active-menu" : ""}`}><img src={Reportsicon} />{t('Reports')}</li></Link>
                                {/* <li className="active"><Link to="/dashboard"><img src={Administrationicon} />Administration</a></li> */}
                                <li className='sidenavmenu-item'>
                                    <div className="dropdown administraton-dropdown mt-3">

                                        <button onClick={() => toggleDropdown('administration')}      className={`dropdown-toggle administration d-flex align-items-center ${dropdownState.administration ? 'active-dropdown' : ''}`}>
                                            
                                            <img src={Administrationicon} />{t('Administration')}
                                        </button>
                                   
                                        

                                        {dropdownState.administration && (

                                            <div class="dropdown-menu-right Administration-cnt">
                                                <ul className='administration-menu'>
                                                   <Link to="/tenants"> <li className={isActive("/tenants") ? "active-submenu " : ""}> <FontAwesomeIcon icon={faUser} className='font-icon' />{t('Tenants')} </li></Link>
                                                   <Link to="/organizations"><li className={isActive("/organizations") ? "active-submenu " : ""}><FontAwesomeIcon icon={faSitemap} className='font-icon'  />{t('Organization')}</li></Link>
                                                   <Link to="/roles"><li  className={isActive("/roles") ? "active-submenu " : ""}><FontAwesomeIcon icon={faUserPlus} className='font-icon'  />   {t("Roles")}</li></Link>
                                                   <Link to="/users"><li  className={isActive("/users") ? "active-submenu" : ""}>  <FontAwesomeIcon icon={faUser} className='font-icon' /> {t('Users')}</li></Link>
                                                   <Link to="/permissions"> <li  className={isActive("/permissions") ? "active-submenu" : ""}> <FontAwesomeIcon icon={faUserPen} className='font-icon' /> {t('Permissions')}</li></Link>
                                                   <Link to="/settings"><li  className={isActive("/settings") ? "active-submenu" : ""}><FontAwesomeIcon icon={faGear} className='font-icon' /> {t('Settings')}</li></Link>
                                                  
                    <Link to="/sample" >
                      <li >{t('Sample')}</li>
                    </Link>
                                                </ul>
                                            </div>

                                        )}
                                    </div>
                                </li>

                            </ul>
                        </nav>
                        <div className="footer">
                            <hr />
                            <div className='footer-heading'>{t('Environment Agency Admin')}<br />
                                <span className='rights'>{t('All Rights Reserved')}</span>
                            </div>
                        </div>
                    </aside>
                </div>
    </div>
  )
}

export default Sidebar
