
import React, { useState } from 'react';
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
import Sample from './components/Sample.js';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine if the current route is the login or signup page
  const isLoginPage = location.pathname === '/' || location.pathname === '/signup';

  return (
    <div className="layout-wrapper">
      {!isLoginPage && isSidebarOpen && (
        <div className="main-menu active">
          <Sidebar />
        </div>
      )}
      <div className={`page-content ${isLoginPage ? '' : 'with-sidebar'}`}>
        {!isLoginPage && <Topbar toggleSidebar={toggleSidebar} />}
        <div>
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
            <Route path="/sample" element={<Sample />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
