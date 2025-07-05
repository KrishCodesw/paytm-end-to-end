import { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, settoken] = useState(() => {
    localStorage.getItem("token");
  });
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    settoken(token);
  };
  const logout = () => {
    localStorage.removeItem("token");
    settoken(null);
  };

  const isAuthenticated = !!token;

  return (
    <Authcontext.Provider value={{ login, logout, token, isAuthenticated }}>
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => {
  useContext(Authcontext);
};
