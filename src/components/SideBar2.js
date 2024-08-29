// Sidebar.js
import React, { useState } from "react";
import '../css/SideBar.css'; // We'll create this CSS file next

const SideBar2 = () => {
    const [dropdowns, setDropdowns] = useState({
        custom: false,
        components: false,
        icons: false,
    });

    const toggleDropdown = (name) => {
        setDropdowns({ ...dropdowns, [name]: !dropdowns[name] });
    };

    return (
        <div className="sidebar">
            <div className="logo">
                <h2>DASHTRAP</h2>
            </div>
            <ul className="menu">
                <li className="menu-item">
                    <a href="#dashboards" className="menu-link">
                        <span className="icon">🏠</span> Dashboards 
                        <span className="badge">01</span>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#calendar" className="menu-link">
                        <span className="icon">📅</span> Calendar
                    </a>
                </li>
                <li className="menu-item" onClick={() => toggleDropdown('custom')}>
                    <div className="menu-link">
                        <span className="icon">📄</span> Extra Pages
                        <span className="dropdown-icon">{dropdowns.custom ? "▲" : "▼"}</span>
                    </div>
                    {dropdowns.custom && (
                        <ul className="dropdown">
                            <li><a href="#page1">Page 1</a></li>
                            <li><a href="#page2">Page 2</a></li>
                        </ul>
                    )}
                </li>
                <li className="menu-item" onClick={() => toggleDropdown('components')}>
                    <div className="menu-link">
                        <span className="icon">📦</span> Components
                        <span className="badge hot">Hot</span>
                        <span className="dropdown-icon">{dropdowns.components ? "▲" : "▼"}</span>
                    </div>
                    {dropdowns.components && (
                        <ul className="dropdown">
                            <li onClick={() => toggleDropdown('icons')}>
                                Icons 
                                <span className="dropdown-icon">{dropdowns.icons ? "▲" : "▼"}</span>
                                {dropdowns.icons && (
                                    <ul className="sub-dropdown">
                                        <li><a href="#feather">Feather Icons</a></li>
                                        <li><a href="#material">Material Design Icons</a></li>
                                        <li><a href="#dripicons">Dripicons</a></li>
                                    </ul>
                                )}
                            </li>
                            <li><a href="#forms">Forms</a></li>
                            <li><a href="#tables">Tables</a></li>
                            <li><a href="#charts">Charts</a></li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default SideBar2;
