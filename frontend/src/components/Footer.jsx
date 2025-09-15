import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Tickewise 🎟️</h2>
          <p className="text-gray-400">
            Your trusted platform for discovering, booking, and managing events
            with ease. Bringing people together, one event at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-purple-400">Home</Link></li>
            <li><Link to="/events" className="hover:text-purple-400">Events</Link></li>
            <li><Link to="/about" className="hover:text-purple-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-purple-400">Contact</Link></li>
          </ul>
        </div>

        {/* Contact / Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
          <p>Email: support@tickewise.com</p>
          <p>Phone: +254 700 123 456</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-purple-400">🌐</a>
            <a href="#" className="hover:text-purple-400">📘</a>
            <a href="#" className="hover:text-purple-400">🐦</a>
            <a href="#" className="hover:text-purple-400">📸</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Tickewise. All rights reserved.
      </div>
    </footer>
  );
}
