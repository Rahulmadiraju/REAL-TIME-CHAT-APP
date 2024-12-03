import React, { createContext, useState, useEffect } from 'react';
import { login, register, logout } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    const userData = await login(email, password);
    setUser(userData);
    localStorage.setItem('token', userData.jwt);
  };

  const registerUser = async (username, email, password) => {
    const userData = await register(username, email, password);
    setUser(userData);
    localStorage.setItem('token', userData.jwt);
  };

  const logoutUser = () => {
    logout();
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
