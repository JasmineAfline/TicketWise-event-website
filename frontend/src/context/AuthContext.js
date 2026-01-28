// src/context/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);        // logged-in user object
  const [token, setToken] = useState(null);      // JWT token
  const [loading, setLoading] = useState(true);  // auth initialization state

  // Same pattern as EventContext: base URL points to /api
  const API_BASE_URL =
    process.env.REACT_APP_API_URL ||
    "https://ticketwise-backend.onrender.com/api";

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  // Attach token to every request if present
  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Load auth from localStorage on first mount
  useEffect(() => {
    const storedUser = localStorage.getItem("ticketwise_user");
    const storedToken = localStorage.getItem("ticketwise_token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch {
        localStorage.removeItem("ticketwise_user");
        localStorage.removeItem("ticketwise_token");
      }
    }
    setLoading(false);
  }, []);

  // Login
  const login = useCallback(
    async (email, password) => {
      try {
        const res = await axiosInstance.post("/users/login", {
          email,
          password,
        }); // -> POST /api/users/login

        // Adjust these keys if your backend uses different names
        const loggedInUser = res.data.user || res.data.data || res.data;
        const jwtToken = res.data.token;

        if (!jwtToken) {
          throw new Error("No token returned from server");
        }

        setUser(loggedInUser);
        setToken(jwtToken);

        localStorage.setItem("ticketwise_user", JSON.stringify(loggedInUser));
        localStorage.setItem("ticketwise_token", jwtToken);

        return res.data;
      } catch (err) {
        console.error("Login error:", err);
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to login";
        throw new Error(message);
      }
    },
    [axiosInstance]
  );

  // Register
  const register = useCallback(
    async (payload) => {
      // payload: { name, email, password, role, ... } depending on your API
      try {
        const res = await axiosInstance.post("/users/register", payload); // /api/users/register
        return res.data;
      } catch (err) {
        console.error("Register error:", err);
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to register";
        throw new Error(message);
      }
    },
    [axiosInstance]
  );

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("ticketwise_user");
    localStorage.removeItem("ticketwise_token");
  }, []);

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Optionally gate children until auth is initialized */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
