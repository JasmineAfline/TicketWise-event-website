import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [showDropdown, setShowDropdown] = useState(false); // Profile dropdown
  const { user, logout } = useAuth();

  // Close dropdown on logout or dashboard click
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <nav className="bg-white shadow-md w-full z-20 top-0 left-0">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-600">
          Tickewise
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-purple-600">Home</Link>
         
          <Link to="/about" className="hover:text-purple-600">About</Link>
          <Link to="/contact" className="hover:text-purple-600">Contact</Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500"
              >
                {user.name || "Profile"}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2 z-30">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-4">
          <Link
            to="/"
            className="block hover:text-purple-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/events"
            className="block hover:text-purple-600"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/about"
            className="block hover:text-purple-600"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block hover:text-purple-600"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block hover:text-purple-600"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 text-center"
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
