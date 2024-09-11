import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import { RolesProvider } from './contexts/RolesContext'; // Import the RolesProvider
import { UsersProvider } from './contexts/UsersContext';
import { CompanyProfileProvider } from './contexts/CompanyProfileContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { TenantProvider } from './contexts/TenantContext';
import { PermissionsProvider } from './contexts/PermissionsContext';
import { TenantRolesProvider } from './contexts/TenantRolesContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n.js';
import { ToastContainer } from 'react-toastify'; // Update import to react-toastify
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId = '401509485101-rheep9epjkoe9i6m8frv25ppjv9c4b45.apps.googleusercontent.com';

// Render the app
root.render(
  <Router>
    <TenantRolesProvider>
      <PermissionsProvider>
        <TenantProvider>
          <RolesProvider>
            <UsersProvider>
              <CompanyProfileProvider>
                <GoogleOAuthProvider clientId={clientId}>
                  <I18nextProvider i18n={i18n}>
                    <App />
                    <ToastContainer />
                  </I18nextProvider>
                </GoogleOAuthProvider>
              </CompanyProfileProvider>
            </UsersProvider>
          </RolesProvider>
        </TenantProvider>
      </PermissionsProvider>
    </TenantRolesProvider>
  </Router>
);