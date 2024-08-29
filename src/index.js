// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <Router>
    <App />
  </Router>
);
