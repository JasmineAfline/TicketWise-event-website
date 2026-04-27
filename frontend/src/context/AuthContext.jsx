import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

console.log("API BASE IS:", process.env.REACT_APP_API_URL);

// ✅ SAFE for production + development
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const API_URL = `${API_BASE}/users`;

  const navigate = useNavigate();

  // Load user info if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const res = await axios.get(`${API_URL}/me`);

          const userData = {
            ...res.data.user,
            token,
          };

          setUser(userData);
          redirectByRole(userData.role);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          logout();
        }
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Role-based redirect
  const redirectByRole = (role) => {
    if (!role) return;
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "employee") navigate("/employee/dashboard");
    else navigate("/user/dashboard");
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });

      const userData = {
        ...res.data.user,
        token: res.data.token,
      };

      setUser(userData);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      redirectByRole(userData.role);
      return userData;
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      return null;
    }
  };

  // Register
  const register = async (name, email, password, role = "user") => {
    try {
      await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful! You can now log in.");

      // Auto-login after register
      await login(email, password);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["Authorization"];

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
