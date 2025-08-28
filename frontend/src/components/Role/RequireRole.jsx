import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * RequireRole accepts one or multiple roles:
 * <RequireRole roles={['admin','employee']}>...</RequireRole>
 */
function RequireRole({ roles = [], children }) {
  const { role } = useAuth();
  if (!role || !roles.includes(role)) {
    // you can show a "forbidden" page instead
    return <Navigate to="/" replace />;
  }
  return children;
}

export default RequireRole;
