import React, { useState } from "react";
import "../css/Sidenavbar.css";
import { FaHome } from "react-icons/fa";
import logoLight from "../images/logo-light.png";
import logoSm from "../images/logo-sm.png";
import { FaUserShield } from "react-icons/fa";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
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

          {/* <!-- Brand Logo Dark --> */}
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
                  {/* <li className="menu-item">
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
                                        </li> */}
                </ul>
              </div>
            </li>

            {/* <li class="menu-item">
                                <a href="#menuLayouts" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                                    <span className="menu-icon">
                                    </span>
                                    <span className="menu-text">Layouts</span>
                                    <span className="badge bg-blue ms-auto">New</span>
                                </a>
                                <div class="collapse" id="menuLayouts">
                                    <ul class="sub-menu">
                                        <li class="menu-item">
                                            <a href="layout-horizontal.html" class="menu-link">
                                                <span class="menu-text">Horizontal</span>
                                            </a>
                                        </li>

                                        <li class="menu-item">
                                            <a href="layout-sidenav-light.html" class="menu-link">
                                                <span class="menu-text">Sidenav Light</span>
                                            </a>
                                        </li>

                                        <li class="menu-item">
                                            <a href="layout-sidenav-dark.html" class="menu-link">
                                                <span class="menu-text">Sidenav Dark</span>
                                            </a>
                                        </li>

                                        <li class="menu-item">
                                            <a href="layout-topbar-dark.html" class="menu-link">
                                                <span class="menu-text">Topbar Dark</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="menu-title">Components</li>

                            <li class="menu-item">
                                <a href="#menuComponentsui" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                                    <span className="menu-icon">
                                    </span>
                                    <span className="menu-text">UI Elements</span>
                                    <span className="menu-arrow"></span>
                                </a>
                                <div class="collapse" id="menuComponentsui">
                                    <ul class="sub-menu">
                                        <li class="menu-item">
                                            <a href="ui-alerts.html" class="menu-link">
                                                <span class="menu-text">Alerts</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-buttons.html" class="menu-link">
                                                <span class="menu-text">Buttons</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-cards.html" class="menu-link">
                                                <span class="menu-text">Cards</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-carousel.html" class="menu-link">
                                                <span class="menu-text">Carousel</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-dropdowns.html" class="menu-link">
                                                <span class="menu-text">Dropdowns</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-video.html" class="menu-link">
                                                <span class="menu-text">Embed Video</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-general.html" class="menu-link">
                                                <span class="menu-text">General UI</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-grid.html" class="menu-link">
                                                <span class="menu-text">Grid</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-images.html" class="menu-link">
                                                <span class="menu-text">Images</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-list-group.html" class="menu-link">
                                                <span class="menu-text">List Group</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-modals.html" class="menu-link">
                                                <span class="menu-text">Modals</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-offcanvas.html" class="menu-link">
                                                <span class="menu-text">Offcanvas</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-placeholders.html" class="menu-link">
                                                <span class="menu-text">Placeholders</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-progress.html" class="menu-link">
                                                <span class="menu-text">Progress</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-spinners.html" class="menu-link">
                                                <span class="menu-text">Spinners</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-tabs-accordions.html" class="menu-link">
                                                <span class="menu-text">Tabs & Accordions</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-tooltips-popovers.html" class="menu-link">
                                                <span class="menu-text">Tooltips & Popovers</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="ui-typography.html" class="menu-link">
                                                <span class="menu-text">Typography</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="menu-item">
                                <a href="#menuExtendedui" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                                    <span className="menu-icon">
                                    </span>
                                    <span className="menu-text">Components</span>
                                    <span className="badge bg-info ms-auto">Hot</span>
                                </a>
                                <div class="collapse" id="menuExtendedui">
                                    <ul class="sub-menu">
                                        <li class="menu-item">
                                            <a href="components-range-slider.html" class="menu-link">
                                                <span class="menu-text">Range Slider</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="components-sweet-alert.html" class="menu-link">
                                                <span class="menu-text">Sweet Alert</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="components-loading-buttons.html" class="menu-link">
                                                <span class="menu-text">Loading Buttons</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="menu-item">
                                <a href="#menuIcons" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                                    <span className="menu-icon">
                                    </span>
                                    <span className="menu-text">Icons</span>
                                    <span className="menu-arrow"></span>
                                </a>
                                <div class="collapse" id="menuIcons">
                                    <ul class="sub-menu">
                                        <li class="menu-item">
                                            <a href="icons-feather.html" class="menu-link">
                                                <span class="menu-text">Feather Icons</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="icons-mdi.html" class="menu-link">
                                                <span class="menu-text">Material Design Icons</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="icons-dripicons.html" class="menu-link">
                                                <span class="menu-text">Dripicons</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="menu-item">
                                <a href="#menuForms" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                                    <span className="menu-icon">
                                    </span>
                                    <span className="menu-text">Forms</span>
                                    <span className="menu-arrow"></span>
                                </a>
                                <div class="collapse" id="menuForms">
                                    <ul class="sub-menu">
                                        <li class="menu-item">
                                            <a href="forms-elements.html" class="menu-link">
                                                <span class="menu-text">General Elements</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="forms-advanced.html" class="menu-link">
                                                <span class="menu-text">Advanced</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="forms-validation.html" class="menu-link">
                                                <span class="menu-text">Validation</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="forms-quilljs.html" class="menu-link">
                                                <span class="menu-text">Editor</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="forms-file-uploads.html" class="menu-link">
                                                <span class="menu-text">File Uploads</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="menu-item">
                                <a href="#menuTables" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                                    <span className="menu-icon">
                                    </span>
                                    <span className="menu-text">Tables</span>
                                    <span className="menu-arrow"></span>
                                </a>
                                <div class="collapse" id="menuTables">
                                    <ul class="sub-menu">
                                        <li class="menu-item">
                                            <a href="tables-basic.html" class="menu-link">
                                                <span class="menu-text">Basic Tables</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="tables-datatables.html" class="menu-link">
                                                <span class="menu-text">Data Tables</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="menu-item">
                                <a href="#menuCharts" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                                    <span className="menu-icon">
                                    </span>
                                    <span className="menu-text">Charts</span>
                                    <span className="menu-arrow"></span>
                                </a>
                                <div class="collapse" id="menuCharts">
                                    <ul class="sub-menu">
                                        <li class="menu-item">
                                            <a href="charts-apex.html" class="menu-link">
                                                <span class="menu-text">Apex Charts</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="charts-morris.html" class="menu-link">
                                                <span class="menu-text">Morris Charts</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="charts-chartjs.html" class="menu-link">
                                                <span class="menu-text">Chartjs Charts</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="menu-item">
                                <a href="#menuMaps" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                                    <span className="menu-icon">
                                    </span>
                                    <span className="menu-text">Maps</span>
                                    <span className="menu-arrow"></span>
                                </a>
                                <div class="collapse" id="menuMaps">
                                    <ul class="sub-menu">
                                        <li class="menu-item">
                                            <a href="maps-google.html" class="menu-link">
                                                <span class="menu-text">Google Maps</span>
                                            </a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="maps-vector.html" class="menu-link">
                                                <span class="menu-text">Vector Maps</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="menu-item">
                                <a href="#menuMultilevel" data-bs-toggle="collapse" className="menu-link waves-effect waves-light">
                                    <span className="menu-icon">
                                    </span>
                                    <span className="menu-text">Multi Level</span>
                                    <span className="menu-arrow"></span>
                                </a>
                                <div class="collapse" id="menuMultilevel">
                                    <ul class="sub-menu">
                                        <li class="menu-item">
                                            <a href="#menuMultilevel2" data-bs-toggle="collapse"
                                                class="menu-link waves-effect waves-light">
                                                <span class="menu-text"> Second Level </span>
                                                <span class="menu-arrow"></span>
                                            </a>
                                            <div class="collapse" id="menuMultilevel2">
                                                <ul class="sub-menu">
                                                    <li class="menu-item">
                                                        <a href="javascript: void(0);" class="menu-link">
                                                            <span class="menu-text">Item 1</span>
                                                        </a>
                                                    </li>
                                                    <li class="menu-item">
                                                        <a href="javascript: void(0);" class="menu-link">
                                                            <span class="menu-text">Item 2</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <li class="menu-item">
                                            <a href="#menuMultilevel3" data-bs-toggle="collapse"
                                                class="menu-link waves-effect waves-light">
                                                <span class="menu-text">Third Level</span>
                                                <span class="menu-arrow"></span>
                                            </a>
                                            <div class="collapse" id="menuMultilevel3">
                                                <ul class="sub-menu">
                                                    <li class="menu-item">
                                                        <a href="javascript: void(0);" class="menu-link">
                                                            <span class="menu-text">Item 1</span>
                                                        </a>
                                                    </li>
                                                    <li class="menu-item">
                                                        <a href="#menuMultilevel4" data-bs-toggle="collapse"
                                                            class="menu-link waves-effect waves-light">
                                                            <span class="menu-text">Item 2</span>
                                                            <span class="menu-arrow"></span>
                                                        </a>
                                                        <div class="collapse" id="menuMultilevel4">
                                                            <ul class="sub-menu">
                                                                <li class="menu-item">
                                                                    <a href="javascript: void(0);" class="menu-link">
                                                                        <span class="menu-text">Item 1</span>
                                                                    </a>
                                                                </li>
                                                                <li class="menu-item">
                                                                    <a href="javascript: void(0);" class="menu-link">
                                                                        <span class="menu-text">Item 2</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li> */}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
