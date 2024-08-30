// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { RolesProvider } from './contexts/RolesContext'; // Import the RolesProvider
import { UsersProvider } from './contexts/UsersContext';
import { CompanyProfileProvider } from './contexts/CompanyProfileContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { TenantProvider } from './contexts/TenantContext';
import {PermissionsProvider} from './contexts/PermissionsContext';
// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId = '78767199084-jdnad8rafhou8616oce5kub1bss8pspn.apps.googleusercontent.com';


// Render the app
root.render(
  <Router>
    <PermissionsProvider>
    <TenantProvider>
    <RolesProvider>
      <UsersProvider>
        <CompanyProfileProvider>
        <GoogleOAuthProvider clientId={clientId}>
    <App />
    </GoogleOAuthProvider>
    </CompanyProfileProvider>
    </UsersProvider>
    </RolesProvider>
    </TenantProvider>
    </PermissionsProvider>
  </Router>
);
