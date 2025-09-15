// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  // Define menus for each role
  const menus = {
    admin: [
      { path: "/admin", label: "Dashboard" },
      { path: "/admin/manage-users", label: "Manage Users" },
      { path: "/admin/reports", label: "Reports" },
      { path: "/logout", label: "Logout" },
    ],
    employee: [
      { path: "/employee", label: "Dashboard" },
      { path: "/employee/add-event", label: "Add Event" },
      { path: "/employee/reports", label: "Reports" },
      { path: "/logout", label: "Logout" },
    ],
    user: [
      { path: "/user", label: "Dashboard" },
      { path: "/user/my-tickets", label: "My Tickets" },
      { path: "/events", label: "Browse Events" },
      { path: "/logout", label: "Logout" },
    ],
  };

  const currentMenu = menus[role] || [];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6 capitalize">{role} Panel</h2>
      <nav className="flex flex-col gap-4">
        {currentMenu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="hover:bg-gray-700 p-2 rounded transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
