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
import './App.css';
import i18n from './i18n.js';
import Localcontext from './Localcontext.js';


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
             
            </Routes>
          </Suspense>
        </Localcontext.Provider>
      </div>
    </div>
  );
};

export default App;
