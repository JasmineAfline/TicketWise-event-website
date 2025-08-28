import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust path if needed

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // If no user logged in → redirect to register page
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  // If role not allowed → redirect to dashboard
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise → show the page
  return children;
}

export default ProtectedRoute;
