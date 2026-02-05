import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    } catch (e) {
      setUser(null);
      setToken(null);
    }
  }, []);

  const login = ({ user: newUser, token: newToken }) => {
    setUser(newUser || null);
    setToken(newToken || null);
    try {
      if (newUser) localStorage.setItem('user', JSON.stringify(newUser));
      if (newToken) localStorage.setItem('token', newToken);
    } catch {}
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // remove only auth keys, keep other localStorage data (cart, hero etc.)
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
