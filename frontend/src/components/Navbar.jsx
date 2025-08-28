import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/events">Events</NavLink></li>
        <li><NavLink to="/flights">Flights</NavLink></li>
        <li><NavLink to="/getaways">Getaways</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>

        {!isAuthenticated ? (
          <li><NavLink to="/login">Login</NavLink></li>
        ) : (
          <li><button onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
}


export default  Navbar;
