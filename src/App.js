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
import OrganizationGrid from "./components/organization/OrganizationGrid.jsx";
// import OrganizationFormPage from "./components/organization/OrganizationFormPage.js";
import CreateOrganization from "./components/organization/CreateOrganization.jsx";
// import EditOrganizationPage from "./components/organization/EditOrganizationPage.js";
// import ViewOrganizationPage from "./components/organization/ViewOrganizationPage.js";
import { useTranslation } from 'react-i18next';
import EditOrganization from "./components/organization/EditOrganization.jsx";
import ViewOrganization from './components/organization/ViewOrganization.jsx';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  // const [locale, setLocale] = useState(i18n.language);

  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine if the current route is the login or signup page
  const isLoginPage =
    location.pathname === "/" || location.pathname === "/signup";

  const Loading = () => {
    return <>Loading...</>;
  };

  // i18n.on("languagechanged", (lng) => setLocale(i18n.language));

  return (
    <>
     <div className="row mb-3">
          <div className="col">
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('ar')}>Arabic</button>
            <button onClick={() => changeLanguage('fr')}>French</button>
            <button onClick={() => changeLanguage('de')}>German</button>
          </div>
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
                <Route path="/roles" element={<RolesPage />} />
                <Route path="/users" element={<Users />} />
                <Route path="/organizations" element={<CompanyProfile />} />
                <Route path="/tenants" element={<TenantPage />} />
                <Route path="/permissions" element={<PermissionsPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/addnewrole" element={<AddNewRole />} />
                <Route path="/sample" element={<Sample />} />
                <Route path="/settings" element={<Dashboard />} />
                <Route path="/datamanagement" element={<DataManagement />} />
                <Route path="/reports" element={<Dashboard />} />
                <Route path="/usersdata" element={<UserGridPage />} />
                <Route path="/create-user" element={<UserFormPage />} />
                <Route path="/edit-user/:id" element={<UserFormPage />} />
                <Route path="/view-user/:id" element={<UserDetailPage />} />
                <Route path="/tenantsData" element={<TenantGridPage />} />
                <Route path="/create-tenant" element={<TenantFormPage />} />
                <Route
                  path="/edit-tenant/:tenantID"
                  element={<TenantFormPage />}
                />
                <Route
                  path="/view-tenant/:tenantID"
                  element={<TenantDetailPage />}
                />
                <Route
                  path="/permissionsData"
                  element={<PermissionGridPage />}
                />
                <Route
                  path="/create-permission"
                  element={<PermissionFormPage />}
                />
                <Route
                  path="/edit-permission/:permissionID"
                  element={<PermissionFormPage />}
                />
                <Route
                  path="/view-permission/:permissionID"
                  element={<PermissionDetailPage />}
                />
                <Route path="/organizationsGrid" element={<OrganizationGrid />} />
                <Route path="/create-organization" element={<CreateOrganization />} />
                <Route path="/edit-organization/:id" element={<EditOrganization />} />
                <Route path="/view-organization/:id" element={<ViewOrganization />} />
              </Routes>
            </Suspense>
          {/* </Localcontext.Provider> */}
        </div>
      </div>
    </>
  );
};

export default App;
