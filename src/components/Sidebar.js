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
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [dropdownState, setDropdownState] = useState({

    administration: false
    // help: false,
    // more: false
});

// Toggle function
const toggleDropdown = (dropdown) => {
    setDropdownState((prevState) => ({
        ...prevState,
        [dropdown]: !prevState[dropdown]
    }));
};
  return (
    <div>
         <div className="col-12 right-container">
                    <aside className="sidebar">
                        <div className="logo">
                            <img src={logoimage} alt="Environment Agency Admin" />
                        </div>
                        <p className='menu-heading'>Main Menu</p>
                        <nav className="menu">
                            <ul>
                                <li className='menuitem'><a href="#"><img src={Dashboardicon} />Dashboard</a></li>
                                <li className='menuitem'><a href="#"><img src={Datamanagementicon} />Data Management</a></li>
                                <li className='menuitem'><a href="#"><img src={Reportsicon} />Reports</a></li>
                                {/* <li className="active"><a href="#"><img src={Administrationicon} />Administration</a></li> */}
                                <li className='menuitem'>
                                    <div className="dropdown mt-3">

                                        <button onClick={() => toggleDropdown('administration')} className="dropdown-toggle administration d-flex align-items-center">
                                            <img src={Administrationicon} /> Administration
                                        </button>

                                        {dropdownState.administration && (

                                            <div class=" dropdown-menu-right Administration-cnt">
                                                <ul className='administration-menu'>
                                                   <Link to="/tenants"> <li> <img src={Usersicon} /> Tenents</li></Link>
                                                   <Link to="/organizations"><li> <img src={Usersicon} /> Organization</li></Link>
                                                   <Link to="/roles"><li><img src={Usersicon} />    Roles</li></Link>
                                                   <Link to="/users"><li> <img src={Usersicon} />  Users</li></Link>
                                                   <Link to="/permissions"> <li> <img src={Usersicon} /> Permissions</li></Link>
                                                   <Link to="/tenants"><li><img src={settingsicon} /> Settings</li></Link>
                                                  
                    <Link to="/sample" >
                      <li >Sample</li>
                    </Link>
                                                </ul>
                                            </div>

                                        )}
                                    </div>
                                </li>

                            </ul>
                        </nav>
                        <div className="footer">
                            <div className='footer-heading'>Environment Agency Admin<br />
                                <span className='rights'>2024 All rights reserved</span>
                            </div>
                        </div>
                    </aside>
                </div>
    </div>
  )
}

export default Sidebar
