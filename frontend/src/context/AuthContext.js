import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      return res.data.user; // return user so Login page can handle redirect
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      return null;
    }
  };

  const register = async (name, email, password, role = "user") => {
    try {
      await axios.post("http://localhost:5000/auth/register", { name, email, password, role });
      alert("Registration successful! You can now log in.");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
