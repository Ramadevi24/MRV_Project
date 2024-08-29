import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse'; // or from '@mui/material/Collapse' if you're using Material-UI

const Sidebar = () => {
    const [openUiElements, setOpenUiElements] = useState(false);
    const [openMultilevel, setOpenMultilevel] = useState(false);
    const [openMultilevel2, setOpenMultilevel2] = useState(false);
    const [openMultilevel3, setOpenMultilevel3] = useState(false);
    const [openMultilevel4, setOpenMultilevel4] = useState(false);

    const handleUiElementsToggle = () => {
        setOpenUiElements(!openUiElements);
    };

    const handleMultilevelToggle = () => {
        setOpenMultilevel(!openMultilevel);
    };

    const handleMultilevel2Toggle = () => {
        setOpenMultilevel2(!openMultilevel2);
    };

    const handleMultilevel3Toggle = () => {
        setOpenMultilevel3(!openMultilevel3);
    };

    const handleMultilevel4Toggle = () => {
        setOpenMultilevel4(!openMultilevel4);
    };

    return (
        <div className="sidebar">
            <div className="menu">
                <ul className="menu-list">
                    <li className="menu-item">
                        <a href="#uiElements" onClick={handleUiElementsToggle} className="menu-link waves-effect waves-light">
                            <span className="menu-text">UI Elements</span>
                            <span className="menu-arrow"></span>
                        </a>
                        <Collapse in={openUiElements}>
                            <ul className="sub-menu">
                                <li className="menu-item">
                                    <a href="#" className="menu-link">
                                        <span className="menu-text">Item 1</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" className="menu-link">
                                        <span className="menu-text">Item 2</span>
                                    </a>
                                </li>
                            </ul>
                        </Collapse>
                    </li>

                    <li className="menu-item">
                        <a href="#menuMultilevel" onClick={handleMultilevelToggle} className="menu-link waves-effect waves-light">
                            <span className="menu-text">Multilevel</span>
                            <span className="menu-arrow"></span>
                        </a>
                        <Collapse in={openMultilevel}>
                            <ul className="sub-menu">
                                <li className="menu-item">
                                    <a href="#menuMultilevel2" onClick={handleMultilevel2Toggle} className="menu-link waves-effect waves-light">
                                        <span className="menu-text">Second Level</span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <Collapse in={openMultilevel2}>
                                        <ul className="sub-menu">
                                            <li className="menu-item">
                                                <a href="#" className="menu-link">
                                                    <span className="menu-text">Item 1</span>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#" className="menu-link">
                                                    <span className="menu-text">Item 2</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </Collapse>
                                </li>

                                <li className="menu-item">
                                    <a href="#menuMultilevel3" onClick={handleMultilevel3Toggle} className="menu-link waves-effect waves-light">
                                        <span className="menu-text">Third Level</span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <Collapse in={openMultilevel3}>
                                        <ul className="sub-menu">
                                            <li className="menu-item">
                                                <a href="#" className="menu-link">
                                                    <span className="menu-text">Item 1</span>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#menuMultilevel4" onClick={handleMultilevel4Toggle} className="menu-link waves-effect waves-light">
                                                    <span className="menu-text">Item 2</span>
                                                    <span className="menu-arrow"></span>
                                                </a>
                                                <Collapse in={openMultilevel4}>
                                                    <ul className="sub-menu">
                                                        <li className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-text">Item 1</span>
                                                            </a>
                                                        </li>
                                                        <li className="menu-item">
                                                            <a href="#" className="menu-link">
                                                                <span className="menu-text">Item 2</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </Collapse>
                                            </li>
                                        </ul>
                                    </Collapse>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
