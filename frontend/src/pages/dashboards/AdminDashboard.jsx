import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "admin";

  const cards = [
    { title: "Total Users", value: 150, icon: "👥", color: "bg-blue-600", link: "/admin/users" },
    { title: "Events Managed", value: 24, icon: "📊", color: "bg-green-600", link: "/admin/events" },
    { title: "Revenue", value: "$12,340", icon: "💰", color: "bg-yellow-500", link: "/admin/revenue" },
    { title: "Reports", value: 7, icon: "📑", color: "bg-purple-600", link: "/admin/reports" },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome! Your role is: {role}</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.link)}
            className={`${card.color} cursor-pointer text-white p-6 rounded-2xl shadow-lg hover:scale-105 transform transition`}
          >
            <div className="text-4xl mb-3">{card.icon}</div>
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
        className="mt-10 px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
      >
        Logout
      </button>
    </DashboardLayout>
  );
};

export default AdminDashboard;
