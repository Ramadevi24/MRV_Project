import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import RolesPage from './components/roles/RolesPage'
import Users from './components/users/Users.js';
import CompanyProfile from './components/organization/CompanyProfile.js';
import TenantPage from './components/tenants/TenantPage.jsx';
import LoginPage from './pages/Auth/Loginpage';
import PermissionsPage from './components/permissions/PermissionsPage.jsx'

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/roles" element={<RolesPage/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/organizations" element={<CompanyProfile/>}/>
      <Route path="/tenants" element={<TenantPage/>}/>
      <Route path="/permissions" element={<PermissionsPage/>}/>
    </Routes>
  );
};

export default App;
