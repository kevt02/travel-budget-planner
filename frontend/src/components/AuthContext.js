import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ isLoggedIn: false, uid: null });

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
