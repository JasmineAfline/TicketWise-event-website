// src/pages/Unauthorized.jsx
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p className="text-gray-600 mb-6">
        You donâ€™t have permission to access this page.
      </p>
      <Link
        to="/login"
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-500 transition"
      >
        Go to Login
      </Link>
    </div>
  );
}
