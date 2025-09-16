import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "employee";

  const cards = [
    { title: "Assigned Events", value: 8, icon: "🗂️", color: "bg-indigo-600", link: "/employee/events" },
    { title: "Tickets Sold", value: 320, icon: "🎟️", color: "bg-green-500", link: "/employee/tickets" },
    { title: "Tasks Pending", value: 5, icon: "📝", color: "bg-orange-500", link: "/employee/tasks" },
    { title: "Messages", value: 10, icon: "💬", color: "bg-pink-500", link: "/employee/messages" },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Employee Dashboard</h1>
        <p className="text-gray-600">Welcome! Your role is: {role}</p>
      </div>

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

export default EmployeeDashboard;
