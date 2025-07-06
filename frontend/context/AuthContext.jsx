import { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, settoken] = useState(() => {
    return localStorage.getItem("token");
  });
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    settoken(newToken);
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
  const context = useContext(Authcontext);
  if (context === undefined || context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
