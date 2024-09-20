// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const tokenData = localStorage.getItem('AuthToken');
    console.log(tokenData, 'tokenData');
    if (tokenData) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, []);

  const login = (token) => {
    console.log(token, 'token');
    localStorage.setItem('AuthToken', token);
    setIsAuthenticated(true);
  };

  // Function to log out (clear the token)
  const logout = () => {
    localStorage.removeItem('AuthToken');
    setIsAuthenticated(false);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
