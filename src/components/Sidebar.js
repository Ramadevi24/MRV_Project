import React, { useState } from 'react';
// import Collapse from 'react-bootstrap/Collapse'; // or from '@mui/material/Collapse' if you're using Material-UI

const Sidebar = () => {
    return (
        <div className="main-menu">
            {/* Brand Logo */}
            <div className="logo-box">
                {/* Brand Logo Light */}
                <a href="index.html" className="logo-light">
                    <img src="assets/images/logo-light.png" alt="logo" className="logo-lg" height="28" />
                    <img src="assets/images/logo-sm.png" alt="small logo" className="logo-sm" height="28" />
                </a>

                {/* Brand Logo Dark */}
                <a href="index.html" className="logo-dark">
                    <img src="assets/images/logo-dark.png" alt="dark logo" className="logo-lg" height="28" />
                    <img src="assets/images/logo-sm.png" alt="small logo" className="logo-sm" height="28" />
                </a>
            </div>

            {/* Menu */}
            <div data-simplebar>
                <ul className="app-menu">
                    <li className="menu-title">Menu</li>

                    <li className="menu-item">
                        <a href="index.html" className="menu-link waves-effect waves-light">
                            <span className="menu-icon"><i className="bx bx-home-smile"></i></span>
                            <span className="menu-text"> Dashboards </span>
                            <span className="badge bg-primary rounded ms-auto">01</span>
                        </a>
                    </li>

                    <li className="menu-title">Custom</li>

                    <li className="menu-item">
                        <a href="apps-calendar.html" className="menu-link waves-effect waves-light">
                            <span className="menu-icon"><i className="bx bx-calendar"></i></span>
                            <span className="menu-text"> Calendar </span>
                        </a>
                    </li>

                    <li className="menu-item">
                        <a href="#menuExpages" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                            <span className="menu-icon"><i className="bx bx-file"></i></span>
                            <span className="menu-text"> Extra Pages </span>
                            <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="menuExpages">
                            <ul className="sub-menu">
                                <li className="menu-item">
                                    <a href="pages-starter.html" className="menu-link">
                                        <span className="menu-text">Starter</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="pages-invoice.html" className="menu-link">
                                        <span className="menu-text">Invoice</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="pages-login.html" className="menu-link">
                                        <span className="menu-text">Log In</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="pages-register.html" className="menu-link">
                                        <span className="menu-text">Register</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="pages-recoverpw.html" className="menu-link">
                                        <span className="menu-text">Recover Password</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="pages-lock-screen.html" className="menu-link">
                                        <span className="menu-text">Lock Screen</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="pages-404.html" className="menu-link">
                                        <span className="menu-text">Error 404</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="pages-500.html" className="menu-link">
                                        <span className="menu-text">Error 500</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="menu-item">
                        <a href="#menuLayouts" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                            <span className="menu-icon"><i className="bx bx-layout"></i></span>
                            <span className="menu-text"> Layouts </span>
                            <span className="badge bg-blue ms-auto">New</span>
                        </a>
                        <div className="collapse" id="menuLayouts">
                            <ul className="sub-menu">
                                <li className="menu-item">
                                    <a href="layout-horizontal.html" className="menu-link">
                                        <span className="menu-text">Horizontal</span>
                                    </a>
                                </li>

                                <li className="menu-item">
                                    <a href="layout-sidenav-light.html" className="menu-link">
                                        <span className="menu-text">Sidenav Light</span>
                                    </a>
                                </li>

                                <li className="menu-item">
                                    <a href="layout-sidenav-dark.html" className="menu-link">
                                        <span className="menu-text">Sidenav Dark</span>
                                    </a>
                                </li>

                                <li className="menu-item">
                                    <a href="layout-topbar-dark.html" className="menu-link">
                                        <span className="menu-text">Topbar Dark</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="menu-title">Components</li>

                    <li className="menu-item">
                        <a href="#menuComponentsui" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                            <span className="menu-icon"><i className="bx bx-cookie"></i></span>
                            <span className="menu-text"> UI Elements </span>
                            <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="menuComponentsui">
                            <ul className="sub-menu">
                                <li className="menu-item">
                                    <a href="ui-alerts.html" className="menu-link">
                                        <span className="menu-text">Alerts</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-buttons.html" className="menu-link">
                                        <span className="menu-text">Buttons</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-cards.html" className="menu-link">
                                        <span className="menu-text">Cards</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-carousel.html" className="menu-link">
                                        <span className="menu-text">Carousel</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-dropdowns.html" className="menu-link">
                                        <span className="menu-text">Dropdowns</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-video.html" className="menu-link">
                                        <span className="menu-text">Embed Video</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-general.html" className="menu-link">
                                        <span className="menu-text">General UI</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-grid.html" className="menu-link">
                                        <span className="menu-text">Grid</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-images.html" className="menu-link">
                                        <span className="menu-text">Images</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-list-group.html" className="menu-link">
                                        <span className="menu-text">List Group</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-modals.html" className="menu-link">
                                        <span className="menu-text">Modals</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-offcanvas.html" className="menu-link">
                                        <span className="menu-text">Offcanvas</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-placeholders.html" className="menu-link">
                                        <span className="menu-text">Placeholders</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-popovers.html" className="menu-link">
                                        <span className="menu-text">Popovers</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-progress.html" className="menu-link">
                                        <span className="menu-text">Progress</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-spinners.html" className="menu-link">
                                        <span className="menu-text">Spinners</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-tabs.html" className="menu-link">
                                        <span className="menu-text">Tabs</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-toasts.html" className="menu-link">
                                        <span className="menu-text">Toasts</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="ui-tooltips.html" className="menu-link">
                                        <span className="menu-text">Tooltips</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="menu-item">
                        <a href="#menuForms" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                            <span className="menu-icon"><i className="bx bx-file"></i></span>
                            <span className="menu-text"> Forms </span>
                            <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="menuForms">
                            <ul className="sub-menu">
                                <li className="menu-item">
                                    <a href="forms-elements.html" className="menu-link">
                                        <span className="menu-text">Form Elements</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="forms-validation.html" className="menu-link">
                                        <span className="menu-text">Validation</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="forms-advanced.html" className="menu-link">
                                        <span className="menu-text">Advanced</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="forms-editor.html" className="menu-link">
                                        <span className="menu-text">Editor</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="forms-file-uploads.html" className="menu-link">
                                        <span className="menu-text">File Uploads</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="menu-item">
                        <a href="#menuTables" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                            <span className="menu-icon"><i className="bx bx-table"></i></span>
                            <span className="menu-text"> Tables </span>
                            <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="menuTables">
                            <ul className="sub-menu">
                                <li className="menu-item">
                                    <a href="tables-basic.html" className="menu-link">
                                        <span className="menu-text">Basic Tables</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="tables-datatable.html" className="menu-link">
                                        <span className="menu-text">Data Tables</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="menu-item">
                        <a href="#menuCharts" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                            <span className="menu-icon"><i className="bx bx-bar-chart"></i></span>
                            <span className="menu-text"> Charts </span>
                            <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="menuCharts">
                            <ul className="sub-menu">
                                <li className="menu-item">
                                    <a href="charts-apex.html" className="menu-link">
                                        <span className="menu-text">Apex Charts</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="charts-chartjs.html" className="menu-link">
                                        <span className="menu-text">Chartjs</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="charts-echart.html" className="menu-link">
                                        <span className="menu-text">Echart</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="menu-item">
                        <a href="#menuIcons" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                            <span className="menu-icon"><i className="bx bx-diamond"></i></span>
                            <span className="menu-text"> Icons </span>
                            <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="menuIcons">
                            <ul className="sub-menu">
                                <li className="menu-item">
                                    <a href="icons-boxicons.html" className="menu-link">
                                        <span className="menu-text">Boxicons</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="icons-materialdesign.html" className="menu-link">
                                        <span className="menu-text">Material Design</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="icons-dripicons.html" className="menu-link">
                                        <span className="menu-text">Dripicons</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="icons-fontawesome.html" className="menu-link">
                                        <span className="menu-text">Font Awesome</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="menu-item">
                        <a href="#menuMaps" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                            <span className="menu-icon"><i className="bx bx-map"></i></span>
                            <span className="menu-text"> Maps </span>
                            <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="menuMaps">
                            <ul className="sub-menu">
                                <li className="menu-item">
                                    <a href="maps-google.html" className="menu-link">
                                        <span className="menu-text">Google Maps</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="maps-vector.html" className="menu-link">
                                        <span className="menu-text">Vector Maps</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="menu-item">
                        <a href="#menuMultiLevel" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                            <span className="menu-icon"><i className="bx bx-share-alt"></i></span>
                            <span className="menu-text"> Multi Level </span>
                            <span className="menu-arrow"></span>
                        </a>
                        <div className="collapse" id="menuMultiLevel">
                            <ul className="sub-menu">
                                <li className="menu-item">
                                    <a href="#menuLevel1" data-bs-toggle="collapse" className="menu-link">
                                        <span className="menu-text">Level 1.1</span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse" id="menuLevel1">
                                        <ul className="sub-menu">
                                            <li className="menu-item">
                                                <a href="javascript:void(0);" className="menu-link">
                                                    <span className="menu-text">Level 2.1</span>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="javascript:void(0);" className="menu-link">
                                                    <span className="menu-text">Level 2.2</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="menu-item">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <span className="menu-text">Level 1.2</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
