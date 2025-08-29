import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // make sure path is correct

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // If no user logged in → redirect to register page
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  // If allowedRoles are defined but user role is not included → redirect home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Otherwise → show the page
  return children;
}

export default ProtectedRoute;
