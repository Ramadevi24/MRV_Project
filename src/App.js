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


const App = () => {
  const{t}=useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const[selectedMenuItem,setSelectedMenuItem]=useState("Dashboard")
  const [userPermissions, setUserPermissions] = useState([]);

  const location = useLocation();

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
    location.pathname === "/login" || location.pathname === "/signup";

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
          {!isLoginPage && <Topbar toggleSidebar={toggleSidebar}    isSidebarOpen={isSidebarOpen} selectedMenuItem={selectedMenuItem} userPermissions={userPermissions} />}
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/login" element={<LoginPage setUserPermissions={setUserPermissions}/>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
              <Route path="/signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
              <Route path="/sample" element={<ProtectedRoute><Sample /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/datamanagement" element={<ProtectedRoute><DataManagement /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/permissions" element={<ProtectedRoute><PermissionGrid /></ProtectedRoute>} />
              <Route path="/create-permission" element={<ProtectedRoute><CreatePermission /></ProtectedRoute>} />
              <Route path="/edit-permission/:permissionID" element={<ProtectedRoute><EditPermission /></ProtectedRoute>}/>
              <Route path="/view-permission/:permissionID" element={<ProtectedRoute><ViewPermission /></ProtectedRoute>} />
              <Route path="/organizations" element={<ProtectedRoute><OrganizationGridPage /></ProtectedRoute>} />
              <Route path="/create-organization" element={<ProtectedRoute><OrganizationSubmissionPage /></ProtectedRoute>} />
              <Route path="/edit-organization/:id"  element={<ProtectedRoute><EditOrganization /></ProtectedRoute>} />
              <Route path="/view-organization/:id" element={<ProtectedRoute><ViewOrganization /></ProtectedRoute>}/>
              <Route path="/users" element={<ProtectedRoute><UserGrid userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/create-user" element={<ProtectedRoute><UserForm userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/edit-user/:id" element={<ProtectedRoute><EditUser userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/view-user/:id" element={<ProtectedRoute><ViewUser userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/tenants" element={<ProtectedRoute><TenantsGrid /></ProtectedRoute>} />
              <Route path="/create-tenant" element={<ProtectedRoute><TenantForm /></ProtectedRoute>} />
              <Route path="/edit-tenant/:id" element={<ProtectedRoute><EditTenant /></ProtectedRoute>} />
              <Route path="/view-tenant/:id" element={<ProtectedRoute><ViewTenant /></ProtectedRoute>} />
              <Route path="/roles" element={<ProtectedRoute><RoleGrid userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/create-role" element={<ProtectedRoute><AddRole userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/edit-role/:id" element={<ProtectedRoute><EditRole userPermissions={userPermissions}/></ProtectedRoute>} />
              <Route path="/view-role/:id" element={<ProtectedRoute><ViewRole userPermissions={userPermissions}/></ProtectedRoute>} />
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
