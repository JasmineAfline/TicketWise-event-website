import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const API_URL = "http://localhost:5000/api/users";
  const navigate = useNavigate();

  // Load user info if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // ✅ set default header

          const res = await axios.get(`${API_URL}/me`);
          const userData = {
            ...res.data.user,
            token, // ✅ inject token into user
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
        token: res.data.token, // ✅ store token in user
      };

      setUser(userData);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`; // ✅ set default header

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
      await axios.post(`${API_URL}/register`, { name, email, password, role });
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

    delete axios.defaults.headers.common["Authorization"]; // ✅ clear default header

    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
