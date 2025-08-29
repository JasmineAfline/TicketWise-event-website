import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if backend uses different port
});

// ✅ Attach token + ensure headers are set
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  // Always send JSON
  req.headers["Content-Type"] = "application/json";

  // Attach token if available
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});

export default API;
