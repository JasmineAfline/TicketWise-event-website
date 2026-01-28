// src/components/DashboardLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
