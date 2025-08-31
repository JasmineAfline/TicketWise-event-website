import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, user } = useAuth(); // 👈 get the user object

  if (!isAuthenticated) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user?.role)) {
    // Logged in but role not allowed → redirect to home or 403 page
    return <Navigate to="/" replace />;
  }

  // Logged in and role allowed → render the page
  return children;
}

export default ProtectedRoute;
