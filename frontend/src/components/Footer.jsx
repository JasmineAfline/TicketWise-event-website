import { Link } from "react-router-dom";
import { FaTicketAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <FaTicketAlt className="text-purple-400" />
            Tickewise
          </h2>
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
          <p>Phone: +254 704 988 410</p>
          <div className="flex gap-4 mt-4 text-2xl">
            {/* Website */}
            <a
              href="https://myportfolio-hv69iztmk-afline-jasmines-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c2.22 0 4.28.9 5.76 2.36l-1.42 1.42A7.957 7.957 0 0012 6c-1.86 0-3.55.71-4.84 1.88L5.74 6.46A9.958 9.958 0 0112 4zm0 16c-2.22 0-4.28-.9-5.76-2.36l1.42-1.42A7.957 7.957 0 0012 18c1.86 0 3.55-.71 4.84-1.88l1.42 1.42A9.958 9.958 0 0112 20zm-6.36-4.24l1.42-1.42A7.957 7.957 0 006 12c0-1.86.71-3.55 1.88-4.84L6.46 5.74A9.958 9.958 0 004 12c0 2.22.9 4.28 2.36 5.76zm12.72 0A9.958 9.958 0 0020 12c0-2.22-.9-4.28-2.36-5.76l-1.42 1.42A7.957 7.957 0 0018 12c0 1.86-.71 3.55-1.88 4.84l1.42 1.42z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=100094311350472"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.89h-2.33V21.88C18.34 21.13 22 17 22 12z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37c-.84.5-1.77.85-2.76 1.04a4.28 4.28 0 00-7.3 3.9 12.14 12.14 0 01-8.8-4.46 4.28 4.28 0 001.32 5.71 4.27 4.27 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2c-.68.18-1.39.21-2.09.08a4.28 4.28 0 003.99 2.97A8.58 8.58 0 012 19.54a12.1 12.1 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.38-.02-.57A8.7 8.7 0 0024 5.5a8.4 8.4 0 01-2.54.7z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.96.24 2.42.41a4.92 4.92 0 011.79 1.17c.52.52.92 1.16 1.17 1.79.17.46.35 1.25.41 2.42.06 1.27.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.96-.41 2.42a4.92 4.92 0 01-1.17 1.79 4.91 4.91 0 01-1.79 1.17c-.46.17-1.25.35-2.42.41-1.27.06-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.96-.24-2.42-.41a4.91 4.91 0 01-1.79-1.17 4.91 4.91 0 01-1.17-1.79c-.17-.46-.35-1.25-.41-2.42C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.96.41-2.42a4.91 4.91 0 011.17-1.79A4.91 4.91 0 015.56 2.68c.46-.17 1.25-.35 2.42-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.735 0 8.332.012 7.052.07 5.755.127 4.83.33 4.05.607a7.12 7.12 0 00-2.57 1.68A7.12 7.12 0 00.607 4.05C.33 4.83.127 5.755.07 7.052.012 8.332 0 8.735 0 12c0 3.265.012 3.668.07 4.948.057 1.297.26 2.222.537 3a7.123 7.123 0 001.68 2.57 7.12 7.12 0 002.57 1.68c.778.277 1.703.48 3 .537 1.28.058 1.683.07 4.948.07s3.668-.012 4.948-.07c1.297-.057 2.222-.26 3-.537a7.12 7.12 0 002.57-1.68 7.12 7.12 0 001.68-2.57c.277-.778.48-1.703.537-3 .058-1.28.07-1.683.07-4.948s-.012-3.668-.07-4.948c-.057-1.297-.26-2.222-.537-3a7.12 7.12 0 00-1.68-2.57 7.12 7.12 0 00-2.57-1.68c-.778-.277-1.703-.48-3-.537C15.668.012 15.265 0 12 0z" />
                <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zM18.406 4.594a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        Â© {new Date().getFullYear()} Tickewise. All rights reserved.
      </div>
    </footer>
  );
}
