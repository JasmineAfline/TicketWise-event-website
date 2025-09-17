import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // fixed path
import { FiChevronLeft, FiChevronRight, FiPlus, FiList, FiBookOpen } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // { role: "admin" | "employee" | "user" }
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return <div className="p-10">Loading...</div>;

  const toggleSidebar = () => setCollapsed(!collapsed);

  // Menu items based on role
  const menuItems = [
    ...(user.role === "admin"
      ? [
          { name: "Add Event", icon: <FiPlus />, path: "/admin/add-event" },
          { name: "Manage Events", icon: <FiList />, path: "/admin/manage-events" },
        ]
      : []),
    ...(user.role === "employee"
      ? [{ name: "View Events", icon: <FiList />, path: "/employee/view-events" }]
      : []),
    ...(user.role === "user"
      ? [{ name: "Book Event", icon: <FiBookOpen />, path: "/user/" }]
      : []),
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`flex flex-col bg-gray-800 text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!collapsed && <span className="font-bold text-lg">Dashboard</span>}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded hover:bg-gray-700 transition"
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        <ul className="flex-1 mt-4">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 cursor-pointer p-3 mx-2 my-1 rounded hover:bg-gray-700 transition ${
                location.pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </h1>
        <p className="text-gray-700">
          Select an option from the sidebar to continue.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
