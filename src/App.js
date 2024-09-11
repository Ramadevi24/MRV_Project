import React, { useState, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import RolesPage from './components/roles/RolesPage';
import Users from './components/users/Users.js';
import CompanyProfile from './components/organization/CompanyProfile.js';
import TenantPage from './components/tenants/TenantPage.jsx';
import LoginPage from './pages/Auth/Loginpage';
import PermissionsPage from './components/permissions/PermissionsPage.jsx';
import Topbar from './components/Topbar.js';
import Sidebar from './components/Sidebar.js';
import Signup from './pages/Signup.js';
import AddNewRole from './components/roles/AddNewRole.js';
import Sample from './components/Sample.js';
import DataManagement from './pages/DataManagement.js';
import i18n from './i18n.js';
import Localcontext from './Localcontext.js';

import './App.css'
import OrganizationTable from './components/organization/OrganizationTable.jsx';
import OrganizationForm from './components/organization/OrganizationForm.jsx';
import OrganizationView from './components/organization/OrganizationView.jsx';
import UserGridPage from './components/users/UserGridPage';
import UserFormPage from './components/users/UserFormPage';
import UserDetailPage from './components/users/UserDetailPage';
import TenantGridPage from './components/tenants/TenantGridPage.js';
import TenantFormPage from './components/tenants/TenantFormPage.js';
import TenantDetailPage from './components/tenants/TenantDetailPage.js';
import PermissionGridPage from './components/permissions/PermissionGridPage.js';
import PermissionFormPage from './components/permissions/PermissionFormPage.js';
import PermissionDetailPage from './components/permissions/PermissionDetailPage.js';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const [locale, setLocale] = useState(i18n.language);

  console.log(locale, 'locale')

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine if the current route is the login or signup page
  const isLoginPage = location.pathname === '/' || location.pathname === '/signup';

  const Loading = () => {
    return <>Loading...</>;
  };

  i18n.on('languagechanged', (lng) => setLocale(i18n.language));


  return (
    <div className="col-12 layout-wrapper">
      {!isLoginPage && isSidebarOpen && (
        <div className="col-2 main-menu active">
          <Sidebar />
        </div>
      )}
      <div className={`page-content col-10 ${isLoginPage ? 'login-page' : 'with-sidebar'}`}>
        {!isLoginPage && <Topbar toggleSidebar={toggleSidebar} />}

        {/* Moved the language selection dropdown outside of Routes */}
     

        <Localcontext.Provider value={{ locale, setLocale }}>
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
              <Route path="/organizationtable"  element={<OrganizationTable/>} />
            <Route path="/add-organization" element={<OrganizationForm/>} />
            <Route path="/edit-organization/:id" element={<OrganizationForm/>} />
            <Route path="/view-organization/:id" element={<OrganizationView/>}/>
            <Route path="/usersdata" element={<UserGridPage />} />
        <Route path="/create-user" element={<UserFormPage />} />
        <Route path="/edit-user/:id" element={<UserFormPage />} />
        <Route path="/view-user/:id" element={<UserDetailPage />} />
        <Route path="/tenantsData" element={<TenantGridPage />} />
          <Route path="/create-tenant" element={<TenantFormPage />} />
          <Route path="/edit-tenant/:tenantID" element={<TenantFormPage />} />
          <Route path="/view-tenant/:tenantID" element={<TenantDetailPage />} />
          <Route path="/permissionsData" element={<PermissionGridPage />} />
          <Route path="/create-permission" element={<PermissionFormPage />} />
          <Route path="/edit-permission/:permissionID" element={<PermissionFormPage />} />
          <Route path="/view-permission/:permissionID" element={<PermissionDetailPage />} />
            </Routes>
          </Suspense>
        </Localcontext.Provider>
      </div>
    </div>
  );
};

export default App;
