// src/services/api.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // replace with your backend URL
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional) to handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optionally redirect to login page here
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
