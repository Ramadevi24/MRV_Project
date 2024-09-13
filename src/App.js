import React, { useState, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import RolesPage from "./components/roles/RolesPage";
import Users from "./components/users/Users.js";
import CompanyProfile from "./components/organization/CompanyProfile.js";
import TenantPage from "./components/tenants/TenantPage.jsx";
import LoginPage from "./pages/Auth/Loginpage";
import PermissionsPage from "./components/permissions/PermissionsPage.jsx";
import Topbar from "./components/Topbar.js";
import Sidebar from "./components/Sidebar.js";
import Signup from "./pages/Signup.js";
import AddNewRole from "./components/roles/AddNewRole.js";
import Sample from "./components/Sample.js";
import DataManagement from "./pages/DataManagement.js";
import i18n from "./i18n.js";
import Localcontext from "./Localcontext.js";
import "./App.css";
import UserGridPage from "./components/users/UserGridPage";
import UserFormPage from "./components/users/UserFormPage";
import UserDetailPage from "./components/users/UserDetailPage";
import TenantGridPage from "./components/tenants/TenantGridPage.js";
import TenantFormPage from "./components/tenants/TenantFormPage.js";
import TenantDetailPage from "./components/tenants/TenantDetailPage.js";
import PermissionGridPage from "./components/permissions/PermissionGridPage.js";
import PermissionFormPage from "./components/permissions/PermissionFormPage.js";
import PermissionDetailPage from "./components/permissions/PermissionDetailPage.js";
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

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();




  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine if the current route is the login or signup page
  const isLoginPage =
    location.pathname === "/" || location.pathname === "/signup";

  const Loading = () => {
    return <>Loading...</>;
  };


  return (
    <>
     <div className="row mb-3">
        </div>
      <div className="col-12 layout-wrapper">
        {!isLoginPage && isSidebarOpen && (
          <div className="col-2 main-menu active">
            <Sidebar />
          </div>
        )}
        <div
          className={`page-content col-10 ${
            isLoginPage ? "login-page" : "with-sidebar"
          }`}
        >
          {!isLoginPage && <Topbar toggleSidebar={toggleSidebar} />}

          {/* Moved the language selection dropdown outside of Routes */}

          {/* <Localcontext.Provider value={{ locale, setLocale }}> */}
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/roles" element={<RolesPage />} /> */}
                <Route path="/user" element={<Users />} />
                <Route path="/organizatio" element={<CompanyProfile />} />
                <Route path="/tenant" element={<TenantPage />} />
                <Route path="/permission" element={<PermissionsPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/addnewrole" element={<AddNewRole />} />
                <Route path="/sample" element={<Sample />} />
                <Route path="/settings" element={<Dashboard />} />
                <Route path="/datamanagement" element={<DataManagement />} />
                <Route path="/reports" element={<Dashboard />} />
                <Route path="/usersdata" element={<UserGridPage />} />
                {/* <Route path="/create-user" element={<UserFormPage />} />
                <Route path="/edit-user/:id" element={<UserFormPage />} />
                <Route path="/view-user/:id" element={<UserDetailPage />} /> */}
                <Route path="/tenantsData" element={<TenantGridPage />} />
                {/* <Route path="/create-tenant" element={<TenantFormPage />} /> */}
                {/* <Route
                  path="/edit-tenant/:tenantID"
                  element={<TenantFormPage />}
                />
                <Route
                  path="/view-tenant/:tenantID"
                  element={<TenantDetailPage />}
                /> */}
                <Route
                  path="/permissions"
                  element={<PermissionGrid />}
                />
                <Route
                  path="/create-permission"
                  element={<CreatePermission />}
                />
                <Route
                  path="/edit-permission/:permissionID"
                  element={<EditPermission />}
                />
                <Route
                  path="/view-permission/:permissionID"
                  element={<ViewPermission />}
                />
          <Route path="/organizations"  element={<OrganizationGridPage />} />
         <Route path="/create-organization"  element={<OrganizationSubmissionPage/>} />
        <Route path="/edit-organization/:id" element={<EditOrganization/>} />
        <Route path="/view-organization/:id" element={<ViewOrganization/>} />
        <Route path="/users" element={<UserGrid/>} />
        <Route path="/create-user"  element={<UserForm/>} />
        <Route path="/edit-user/:id" element={<EditUser/>} />
        <Route path="/view-user/:id" element={<ViewUser />} />
        <Route path="/tenants" element={<TenantsGrid />} />
        <Route path="/create-tenant" element={<TenantForm/>} />
        <Route path="/roles" element={<RoleGrid/>} />
        <Route path="/create-role" element={<AddNewRole/>} />
        <Route path="/edit-role/:id" element={<AddNewRole/>} />
        <Route path="/view-role/:id" element={<ViewRole/>} />
        <Route
                  path="/edit-tenant/:id"
                  element={<EditTenant />}
                />
                 <Route
                  path="/view-tenant/:id"
                  element={<ViewTenant />}
                />
              </Routes>
            </Suspense>
          {/* </Localcontext.Provider> */}
        </div>
      </div>
    </>
  );
};

export default App;
