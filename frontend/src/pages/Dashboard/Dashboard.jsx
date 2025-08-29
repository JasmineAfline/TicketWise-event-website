import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/Card";
import Events from "../Events/Events";     // ✅ use existing Events page
import Flights from "../Flights/Flights"; // ✅ use existing Flights page
import "./Dashboard.css";

function Dashboard() {
  const { user, role, hasRole } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("overview");

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  const go = (path) => () => navigate(path);

  const renderContent = () => {
    switch (activeMenu) {
      case "events":
        return <Events embedded />; // 👈 pass a prop to adjust layout for dashboard
      case "flights":
        return <Flights embedded />;
      case "settings":
        return (
          <div>
            <h2>⚙️ Settings</h2>
            <p>Update your profile & preferences.</p>
          </div>
        );
      case "support":
        return (
          <div>
            <h2>💬 Help & Support</h2>
            <p>Contact support or read FAQs.</p>
          </div>
        );
      default:
        return (
          <section className="cards-grid">
            {/* same overview cards as before */}
            {hasRole("admin") && (
              <>
                <Card
                  title="Manage Users"
                  description="Add, remove, or change user roles."
                  onClick={go("/admin/users")}
                />
                <Card
                  title="All Reports"
                  description="View and export system reports."
                  onClick={go("/reports")}
                />
                <Card
                  title="System Settings"
                  description="Configure global settings and integrations."
                  onClick={go("/admin/settings")}
                />
              </>
            )}

            {hasRole("employee") && (
              <>
                <Card
                  title="Add Event"
                  description="Create a new event and publish it."
                  onClick={go("/events/new")}
                />
                <Card
                  title="My Events"
                  description="Edit or remove events you manage."
                  onClick={() => setActiveMenu("events")}
                />
                <Card
                  title="Generate Report"
                  description="Create reports for your events."
                  onClick={go("/reports/create")}
                />
              </>
            )}

            {hasRole("user") && (
              <>
                <Card
                  title="Browse Events"
                  description="See upcoming events and book tickets."
                  onClick={() => setActiveMenu("events")}
                />
                <Card
                  title="My Tickets"
                  description="View tickets you purchased."
                  onClick={go("/tickets")}
                />
                <Card
                  title="Buy with M-Pesa"
                  description="Pay for tickets via M-Pesa checkout flow."
                  onClick={go("/checkout")}
                />
              </>
            )}

            {(hasRole("admin", "employee")) && (
              <Card
                title="Shared Reports"
                description="Both admin and employees can generate these reports."
                onClick={go("/reports/shared")}
              />
            )}

            <Card
              title="Help & Support"
              description="Read docs or contact support for help."
              onClick={() => setActiveMenu("support")}
            />
          </section>
        );
    }
  };

  return (
    <div className={`dashboard-layout ${collapsed ? "collapsed" : ""}`}>
      <aside className="sidebar">
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "☰" : "×"}
        </button>
        <h2 className="sidebar-title">Dashboard</h2>
        <nav>
          <ul>
            <li onClick={() => setActiveMenu("overview")}>Overview</li>
            <li onClick={() => setActiveMenu("events")}>My Events</li>
            <li onClick={() => setActiveMenu("flights")}>My Flights</li>
            <li onClick={() => setActiveMenu("settings")}>Settings</li>
            <li onClick={() => setActiveMenu("support")}>Help & Support</li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Welcome{user?.name ? `, ${user.name}` : ""}</h1>
          <p className="small">Role: <strong>{role || "guest"}</strong></p>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;
