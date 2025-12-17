import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [showDropdown, setShowDropdown] = useState(false); // Profile dropdown
  const [isScrolled, setIsScrolled] = useState(false); // For navbar transparency
  const { user, logout } = useAuth();
  const location = useLocation();

  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on logout or dashboard click
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${isScrolled ? 'navbar-transparent' : 'bg-white shadow-md'
      }`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-600 smooth-hover">
          Tickewise
        </Link>


        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className={`nav-link smooth-hover ${isActive('/') ? 'active text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
          >
            Home
          </Link>
          <Link
            to="/events"
            className={`nav-link smooth-hover ${isActive('/events') ? 'active text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
          >
            Events
          </Link>
          <Link
            to="/about"
            className={`nav-link smooth-hover ${isActive('/about') ? 'active text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`nav-link smooth-hover ${isActive('/contact') ? 'active text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
          >
            Contact
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-pink-400 smooth-hover glow"
              >
                {user.name || "Profile"}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-30 fade-in visible">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 smooth-hover"
                    onClick={() => setShowDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 smooth-hover"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-pink-400 smooth-hover glow"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none smooth-hover"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden bg-white shadow-lg py-4 px-6 space-y-4 fade-in visible`}>
          <Link
            to="/"
            className={`block smooth-hover ${isActive('/') ? 'text-purple-600' : 'hover:text-purple-600'}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/events"
            className={`block smooth-hover ${isActive('/events') ? 'text-purple-600' : 'hover:text-purple-600'}`}
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/about"
            className={`block smooth-hover ${isActive('/about') ? 'text-purple-600' : 'hover:text-purple-600'}`}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`block smooth-hover ${isActive('/contact') ? 'text-purple-600' : 'hover:text-purple-600'}`}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block hover:text-purple-600 smooth-hover"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left text-red-600 hover:text-red-800 smooth-hover"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-pink-400 text-center smooth-hover glow"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
