// src/api/api.js
import axios from "axios";

// Create an axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // replace with your backend URL
});

// Attach token automatically if stored
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
