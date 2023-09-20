import { useState, useEffect } from 'react';

// Oturum açma işlemi
function login(token) {
  const token = generateToken();
  localStorage.setItem('token', token);
}

// Oturum kapatma işlemi
function logout() {
  localStorage.removeItem('token');
}

// Token süresi kontrolü ve oturum açma durumu işlemi
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return {
    isAuthenticated,
    login,
    logout,
  };
}