import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check if there's an auth state stored in localStorage
  const storedAuthState = JSON.parse(localStorage.getItem('authState')) || {
    isLoggedIn: false,
    uid: null,
  };

  const [authState, setAuthState] = useState(storedAuthState);

  useEffect(() => {
    // Update localStorage whenever authState changes
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  const login = (uid) => {
    setAuthState({ isLoggedIn: true, uid });
  };

  const logout = () => {
    setAuthState({ isLoggedIn: false, uid: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};