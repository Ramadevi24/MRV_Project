import React, { useState, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import LoginPage from "./pages/Auth/Loginpage";
import Topbar from "./components/Topbar.js";
import Sidebar from "./components/Sidebar.js";
import Signup from "./pages/Signup.js";
import AddNewRole from "./components/roles/AddNewRole.js";
import Sample from "./components/Sample.js";
import DataManagement from "./pages/DataManagement.js";
import "./App.css";
import OrganizationSubmissionPage from "./components/organization/OrganizationSubmissionPage.js";
import EditOrganization from "./components/organization/EditOrganization.js";
import ViewOrganization from "./components/organization/ViewOrganization.js";
import OrganizationGridPage from "./components/organization/OrganizationGridPage.js";
import UserGrid from "./components/users/UserGrid.js";
import UserForm from "./components/users/UserForm.js";
import EditUser from "./components/users/EditUser.js";
import ViewUser from "./components/users/ViewUser.js";
import TenantsGrid from "./components/tenants/TenantsGrid.js";
import TenantForm from "./components/tenants/TenantForm.js";
import ViewTenant from "./components/tenants/ViewTenant.js";
import EditTenant from "./components/tenants/EditTenant.js";
import PermissionGrid from "./components/permissions/PermissionGrid.js";
import CreatePermission from "./components/permissions/CreatePermission.js";
import ViewPermission from "./components/permissions/ViewPermission.js";
import EditPermission from "./components/permissions/EditPermission.js";
import RoleGrid from "./components/roles/RoleGrid.js";
import ViewRole from "./components/roles/ViewRole.js";
import CompanyProfile from "./components/organization/CompanyProfile.js";
import AddRole from "./components/roles/AddRole.js";
import EditRole from "./components/roles/EditRole.js";
// import EditRole from "./components/roles/EditRole.js";
import { useTranslation } from "react-i18next";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.js";
import { useNavigate } from "react-router-dom";


const App = () => {
  const{t}=useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const[selectedMenuItem,setSelectedMenuItem]=useState(localStorage.getItem("selectedMenuItem") || "Dashboard")
  const userPermissions = JSON.parse(localStorage.getItem("UserPermissions")) || [];
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/Mrv/' || location.pathname === '/Mrv' || location.pathname === '/MRV/'
      ||location.pathname === '/mrv' || location.pathname === '/mrv/' || location.pathname === '/MRV') {
      navigate('/Mrv/login');
    }
  }, [location, navigate]);

  useEffect(() => {
    // Update the selectedMenuItem state and local storage based on the current URL
    const path = location.pathname;
    let menuItem = ""; // Default to Dashboard if no match
    if (path.includes("dashboard")) {
      menuItem = "Dashboard";
    } else if (path.includes("datamanagement")) {
      menuItem = "Data Management";
    } else if (path.includes("reports")) {
      menuItem = "Reports";
    } else if (path.includes("administration")) {
      menuItem = "Administration";
    }
  else if (path.includes("tenants") || path.includes("create-tenant")|| path.includes("/edit-tenant/")||path.includes("/view-tenant/")) {
    menuItem = "Tenants";
  }
  else if (path.includes("organizations")||path.includes("create-organization")||path.includes("/edit-organization/")||path.includes("/view-organization/")) {
    menuItem = "Organizations";
  }
  else if (path.includes("roles")||path.includes("create-role")||path.includes("/view-role/")||path.includes("/edit-role/")) {
    menuItem = "Roles";
  }
  else if (path.includes("users")||path.includes("create-user")||path.includes("/view-user/")||path.includes("/edit-user/")) {
    menuItem = "Users";
  }
  else if (path.includes("permissions") ||path.includes("create-permission")||path.includes("/edit-permission/")||path.includes("/view-permission/") ) {
    menuItem = "Permissions";
  }
  else if (path.includes("settings")) {
    menuItem = "Settings";
  }

    setSelectedMenuItem(menuItem);
    localStorage.setItem("selectedMenuItem", menuItem); // Store it in local storage
  }, [location]);
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsOverlayActive(!isOverlayActive); // Toggle the overlay
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsOverlayActive(false); // Hide the overlay
  };

  // Determine if the current route is the login or signup page
  const isLoginPage =
    location.pathname === "/Mrv/login" || location.pathname === "/Mrv/signup";

  const Loading = () => {
    return <>Loading...</>;
  };

  useEffect(() => {
    // Ensure the sidebar is visible for screens larger than 1024px
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <>
    <AuthProvider>
    
      <div className="layout-wrapper">

      {isOverlayActive && <div className="overlay" onClick={closeSidebar}></div>}

        {!isLoginPage && isSidebarOpen && (
          <div className="col-2 main-menu active">
            <Sidebar setSelectedMenuItem={setSelectedMenuItem} toggleSidebar={toggleSidebar} userPermissions={userPermissions}/>
          </div>
        )}
        <div
          className={`page-content  col-lg-10 ${
            isLoginPage ? "login-page" : "with-sidebar"
          }`}
        >
          {!isLoginPage && <Topbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} selectedMenuItem={selectedMenuItem} userPermissions={userPermissions} />}
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/Mrv/login" element={<LoginPage/>} />
              <Route path="/Mrv/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/Mrv/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
              <Route path="/Mrv/signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
              <Route path="/Mrv/sample" element={<ProtectedRoute><Sample /></ProtectedRoute>} />
              <Route path="/Mrv/settings" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/Mrv/datamanagement" element={<ProtectedRoute><DataManagement /></ProtectedRoute>} />
              <Route path="/Mrv/reports" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/Mrv/permissions" element={<ProtectedRoute><PermissionGrid /></ProtectedRoute>} />
              <Route path="/Mrv/create-permission" element={<ProtectedRoute><CreatePermission /></ProtectedRoute>} />
              <Route path="/Mrv/edit-permission/:permissionID" element={<ProtectedRoute><EditPermission /></ProtectedRoute>}/>
              <Route path="/Mrv/view-permission/:permissionID" element={<ProtectedRoute><ViewPermission /></ProtectedRoute>} />
              <Route path="/Mrv/organizations" element={<ProtectedRoute><OrganizationGridPage /></ProtectedRoute>} />
              <Route path="/Mrv/create-organization" element={<ProtectedRoute><OrganizationSubmissionPage userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/Mrv/edit-organization/:id"  element={<ProtectedRoute><EditOrganization userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/Mrv/view-organization/:id" element={<ProtectedRoute><ViewOrganization /></ProtectedRoute>}/>
              <Route path="/Mrv/users" element={<ProtectedRoute><UserGrid userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/Mrv/create-user" element={<ProtectedRoute><UserForm userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/Mrv/edit-user/:id" element={<ProtectedRoute><EditUser userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/Mrv/view-user/:id" element={<ProtectedRoute><ViewUser userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/Mrv/tenants" element={<ProtectedRoute><TenantsGrid /></ProtectedRoute>} />
              <Route path="/Mrv/create-tenant" element={<ProtectedRoute><TenantForm /></ProtectedRoute>} />
              <Route path="/Mrv/edit-tenant/:id" element={<ProtectedRoute><EditTenant /></ProtectedRoute>} />
              <Route path="/Mrv/view-tenant/:id" element={<ProtectedRoute><ViewTenant /></ProtectedRoute>} />
              <Route path="/Mrv/roles" element={<ProtectedRoute><RoleGrid userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/Mrv/create-role" element={<ProtectedRoute><AddRole userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/Mrv/edit-role/:id" element={<ProtectedRoute><EditRole userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/Mrv/view-role/:id" element={<ProtectedRoute><ViewRole userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="*" element={<h3 style={{textAlign:'center', marginTop:'50px'}}>{t('Page Not Found')}</h3>} />
            </Routes>
          </Suspense>
        </div>
      </div>
      </AuthProvider>
    </>
  );
};

export default App;
