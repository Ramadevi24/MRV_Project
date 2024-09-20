// import React from 'react';
// import { useState,useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import '../css/AddNewRole.css';
// import "../css/Sidenavbar.css";
// import logoimage from '../images/Logoimage.png';
// import Dashboardicon from '../images/Dashboardicon.png';
// import Reportsicon from '../images/ReportIcon.png';
// import Datamanagementicon from '../images/DataManagementicon.png';
// import Administrationicon from '../images/Administrationicon.png';
// import Usersicon from '../images/Usericon.png';
// import settingsicon from '../images/Gearicon.png';
// import { Link,useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faUser} from  '@fortawesome/free-solid-svg-icons';
// import {faSitemap} from  '@fortawesome/free-solid-svg-icons';
// import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
// import {faGear} from '@fortawesome/free-solid-svg-icons';
// import {faUserPen} from '@fortawesome/free-solid-svg-icons';
// import { useTranslation } from "react-i18next";

// const Sidebar = () => {
//     const {t}=useTranslation();
//   const [dropdownState, setDropdownState] = useState({

//     administration: false
//     // help: false,
//     // more: false
// });
// const [activeMenu, setActiveMenu] = useState("");

// // const location = useLocation();

// // Toggle function
// const toggleDropdown = (dropdown) => {
//     setDropdownState((prevState) => ({
//         ...prevState,
//         [dropdown]: !prevState[dropdown]

//     }));
// };
// // useEffect(() => {
// //     // Close all dropdowns when location changes (route change)
// //     setDropdownState({
// //         administration: false
// //     });
// // }, [location]);

// // const handleOutsideClick = (dropdown) => {
// //     setDropdownState({ [dropdown]: false });
// // };

// const handleMenuClick = (menu) => {
//     setActiveMenu(menu); // Set the clicked menu as active
//     setDropdownState({ administration: false }); // Close the dropdown when clicking on any item
// };
// // const isActive = (path) => location.pathname === path;

//   return (
//     <div>
//          <div className="col-12 right-container">
//                     <aside className="sidebar">
//                         <div className="logo">
//                             <img src={logoimage} alt="Environment Agency Admin" />
//                         </div>
//                         <p className='menu-heading'>{t('Main menu')}</p>
//                         <nav className="menu">
//                             <ul className=''>
//                             <Link to="/dashboard" className="menu-link" onClick={() => handleOutsideClick('administration')}><li className={`sidenav-menuitem ${isActive("/dashboard") ? "active-menu" : ""}`}><img src={Dashboardicon} />{t('Dashboard')}</li></Link>
//                             <Link to="/datamanagement" className="menu-link" onClick={() => handleOutsideClick('administration')}><li className={`sidenav-menuitem ${isActive("/datamanagement") ? "active-menu" : ""}`}><img src={Datamanagementicon} />{t('Data Management')}</li></Link>
//                             {/* <Link to="/organizations" className="menu-link"> <li className={`sidenav-menuitem ${isActive("/organizationtable") ? "active-menu" : ""}`}><img src={Dashboardicon} />{t('Organization')}</li></Link>
//                             <Link to="/users" className="menu-link">   <li className={`sidenav-menuitem ${isActive("/usersdata") ? "active-menu" : ""}`}><img src={Datamanagementicon} />{t('Users')}</li></Link>
//                             <Link to="/tenantsData" className="menu-link"> <li className={`sidenav-menuitem ${isActive("/tenantsData") ? "active-menu" : ""}`}><img src={Dashboardicon} />{t('Tenants')}</li></Link>
//                             <Link to="/permissionsData" className="menu-link"> <li className={`sidenav-menuitem ${isActive("/permissionsData") ? "active-menu" : ""}`}><img src={Datamanagementicon} />{t('Permissions')}</li></Link> */}
//                                <Link to="/reports" className="menu-link" onClick={() => handleOutsideClick('administration')}> <li className={`sidenav-menuitem ${isActive("/reports") ? "active-menu" : ""}`}><img src={Reportsicon} />{t('Reports')}</li></Link>
//                                 {/* <li className="active"><Link to="/dashboard"><img src={Administrationicon} />Administration</a></li> */}
//                                 <li className='sidenavmenu-item'>
//                                     <div className="dropdown administraton-dropdown mt-3">

//                                         <button onClick={() => toggleDropdown('administration')}      className={`dropdown-toggle administration d-flex align-items-center ${dropdownState.administration ? 'active-dropdown' : ''}`}>

//                                             <img src={Administrationicon} />{t('Administration')}
//                                         </button>

//                                         {dropdownState.administration && (

//                                             <div class="dropdown-menu-right Administration-cnt">
//                                                 <ul className='administration-menu'>
//                                                    <Link to="/tenants"> <li className={isActive("/tenants") ? "active-submenu " : ""}> <FontAwesomeIcon icon={faUser} className='font-icon' />{t('Tenants')} </li></Link>
//                                                    <Link to="/organizations"><li className={isActive("/organizations") ? "active-submenu " : ""}><FontAwesomeIcon icon={faSitemap} className='font-icon'  />{t('Organization')}</li></Link>
//                                                    <Link to="/roles"><li  className={isActive("/roles") ? "active-submenu " : ""}><FontAwesomeIcon icon={faUserPlus} className='font-icon'  />   {t("Roles")}</li></Link>
//                                                    <Link to="/users"><li  className={isActive("/users") ? "active-submenu" : ""}>  <FontAwesomeIcon icon={faUser} className='font-icon' /> {t('Users')}</li></Link>
//                                                    <Link to="/permissions"> <li  className={isActive("/permissions") ? "active-submenu" : ""}> <FontAwesomeIcon icon={faUserPen} className='font-icon' /> {t('Permissions')}</li></Link>
//                                                    <Link to="/settings"><li  className={isActive("/settings") ? "active-submenu" : ""}><FontAwesomeIcon icon={faGear} className='font-icon' /> {t('Settings')}</li></Link>

//                     <Link to="/sample" >
//                       <li >{t('Sample')}</li>
//                     </Link>
//                                                 </ul>
//                                             </div>

//                                         )}
//                                     </div>
//                                 </li>

//                             </ul>
//                         </nav>
//                         <div className="footer">
//                             <hr />
//                             <div className='footer-heading'>{t('Environment Agency Admin')}<br />
//                                 <span className='rights'>{t('All Rights Reserved')}</span>
//                             </div>
//                         </div>
//                     </aside>
//                 </div>
//     </div>
//   )
// }

// export default Sidebar




import React, { useState } from "react";
import "../css/Sidenavbar.css";
import logoimage from "../images/Logoimage.png";
import Dashboardicon from "../images/Dashboardicon.png";
import Reportsicon from "../images/ReportIcon.png";
import Datamanagementicon from "../images/DataManagementicon.png";
import Administrationicon from "../images/Administrationicon.png";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSitemap,
  faUserPlus,
  faGear,
  faUserPen,faXmark
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import {
  hasPermissionForEntity,
  usersPermissions,
  tenantsPermissions,
  organizationsPermissions,
  rolesPermissions,
  permissionsPermissions,
} from "../utils/useHasPermission.js"; // Adjust the path as per your project structure

const Sidebar = ({setSelectedMenuItem, toggleSidebar, userPermissions}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [dropdownState, setDropdownState] = useState({
    administration: false,
  });
  userPermissions = userPermissions.permissions && userPermissions.permissions?.$values.map((permission) => permission.permissionName)

  // State for the active menu
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  // Toggle function for dropdowns
  const toggleDropdown = (dropdown) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  // Function to handle click on menu items and set the active menu
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);

    setSelectedMenuItem(menu); // Debugging log
  };

  const handleOutsideClick = (dropdown) => {
    setSelectedMenuItem(dropdown)
    setDropdownState({ [dropdown]: false });
    setActiveMenu(dropdown);
  };

  return (
   
    <div>
      <div className="fa-bars-icon " style={{float:'right', margin:'20px',fontSize:'38px'}}>
      <FontAwesomeIcon icon={faXmark} onClick={toggleSidebar}/></div>
      <div className="col-12 right-container">
        <aside className="sidebar">
          <div className="logo">
            <img src={logoimage} alt="Environment Agency Admin" />
          </div>
          <p className="menu-heading">{t("Main menu")}</p>
          <nav className="menu">
            <ul className="">
              <Link
                to="/dashboard"
                className="menu-link"
                onClick={() => handleOutsideClick("Dashboard")}
              >
                <li
                  className={`sidenav-menuitem ${
                    activeMenu === "Dashboard" ? "active-menu" : ""
                  }`}
                >
                  <img src={Dashboardicon} />
                  {t("Dashboard")}
                </li>
              </Link>
              <Link
                to="/datamanagement"
                className="menu-link"
                onClick={() => handleOutsideClick("Data Management")}
              >
                <li
                  className={`sidenav-menuitem ${
                    activeMenu === "Data Management" ? "active-menu" : ""
                  }`}
                >
                  <img src={Datamanagementicon} />
                  {t("Data Management")}
                </li>
              </Link>
              <Link
                to="/reports"
                className="menu-link"
                onClick={() => handleOutsideClick("Reports")}
              >
                <li
                  className={`sidenav-menuitem ${
                    activeMenu === "Reports" ? "active-menu" : ""
                  }`}
                >
                  <img src={Reportsicon} />
                  {t("Reports")}
                </li>
              </Link>
              <li className="sidenavmenu-item adtm-item">
                <div className="dropdown administraton-dropdown mt-3">
                  <button
                    onClick={() => toggleDropdown("administration")}
                    className={`dropdown-toggle administration d-flex align-items-center ${
                      dropdownState.administration ? "active-dropdown" : ""
                    }`}
                  >
                    <img src={Administrationicon} />
                    {t("Administration")}
                  </button>

                  {dropdownState.administration && (
                <div className="dropdown-menu-right Administration-cnt">
                <ul className="administration-menu">
                {hasPermissionForEntity(userPermissions, tenantsPermissions) && (
                  <Link to="/Mrv/tenants">
                    <li
                      className={`menu-item ${activeMenu === "Tenants" ? "active-submenu" : ""}`}
                      onClick={() => handleMenuClick("Tenants")}
                    > 
                    <div className="administration-icon">
                      <FontAwesomeIcon icon={faUser} className="font-icon" />
                      </div>
                     <span className="adminstration-label"> {t("Tenants")}</span>
                    </li>
                  </Link>
                )}
                {hasPermissionForEntity(userPermissions, organizationsPermissions) && (
                  <Link to="/Mrv/organizations">
                    <li
                      className={`menu-item ${activeMenu === "Organizations" ? "active-submenu" : ""}`}
                      onClick={() => handleMenuClick("Organizations")} 
                    >
                      <div className="administration-icon">
                      <FontAwesomeIcon icon={faSitemap} className="font-icon organization-icon" />
                      </div>
                     <span className="adminstration-label"> {t("Organization")}</span>
                    </li>
                  </Link>
                )}
                  {hasPermissionForEntity(userPermissions, rolesPermissions) && (
                  <Link to="/Mrv/roles">
                    <li
                      className={`menu-item ${activeMenu === "Roles" ? "active-submenu" : ""}`}
                      onClick={() => handleMenuClick("Roles")}
                    >
                      <div className="administration-icon">
                      <FontAwesomeIcon icon={faUserPlus} className="font-icon" />
                      </div>
                      
                      <span className="adminstration-label">{t("Roles")}</span>
                    </li>
                  </Link>
                  )}
                     {hasPermissionForEntity(userPermissions, usersPermissions) && (
                  <Link to="/Mrv/users">
                    <li
                      className={`menu-item ${activeMenu === "Users" ? "active-submenu" : ""}`}
                      onClick={() => handleMenuClick("Users")}
                    >
                      <div className="administration-icon">
                      <FontAwesomeIcon icon={faUserPen} className="font-icon" />
                      </div>
                     <span className="adminstration-label"> {t("Users")}</span>
                    </li>
                  </Link>
                     )}
                        {hasPermissionForEntity(userPermissions, permissionsPermissions) && (
                  <Link to="/Mrv/permissions">
                  
                    <li
                    
                      className={`menu-item ${activeMenu === "Permissions" ? "active-submenu" : ""}`}
                      onClick={() => handleMenuClick("Permissions")} 
                    >
                      <div className="administration-icon">
                       <FontAwesomeIcon icon={faUserPen} className="font-icon permission-icon" />
                       </div>
                     
                     <span className="adminstration-label" > {t("Permissions")}</span>
                    </li>
                  </Link>
                        )}
                  <Link to="/Mrv/settings">
                  
                    <li
                      className={`menu-item ${activeMenu === "Settings" ? "active-submenu" : ""}`}
                      onClick={() => handleMenuClick("Settings")}
                    >
                      <div className="administration-icon">
                      <FontAwesomeIcon icon={faGear} className="font-icon" />
                      </div>
                     
                      <span className="adminstration-label">{t("Settings")}</span>
                    
                    </li>
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
            <div className="footer-heading">
              {t("Environment Agency Admin")}
              <br />
              <span className="rights">{t("All Rights Reserved")}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;

