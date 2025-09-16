import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link to="/events" className="hover:text-purple-600">Events</Link>
          <Link to="/about" className="hover:text-purple-600">About</Link>
          <Link to="/contact" className="hover:text-purple-600">Contact</Link>
          <Link
            to="/login"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500"
          >
            Login
          </Link>
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
          <Link
            to="/login"
            className="block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 text-center"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
