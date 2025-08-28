import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  // user: null | { id, name, email, role: 'admin'|'employee'|'user', token }
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  // convenience flags
  const isAuthenticated = !!user;
  const role = user?.role || null;

  function login(userObj) {
    // userObj should include token and role from backend
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  function updateUser(patch) {
    const updated = { ...user, ...patch };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
  }

  // helper: check one or more accepted roles
  function hasRole(...accepted) {
    if (!role) return false;
    return accepted.includes(role);
  }

  // keep in sync across tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "user") {
        try {
          setUser(JSON.parse(e.newValue));
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, login, logout, updateUser, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
