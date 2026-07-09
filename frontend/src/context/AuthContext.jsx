import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/user');
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setLoading(false);
    }
  };

  const register = async (formData) => {
    const res = await axios.post('http://localhost:5000/api/auth/register', formData);
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const login = async (formData) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', formData);
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
