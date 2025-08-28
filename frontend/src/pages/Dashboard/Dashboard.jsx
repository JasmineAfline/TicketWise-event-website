import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/Card";
import "./Dashboard.css";

function Dashboard() {
  const { user, role, hasRole } = useAuth();
  const navigate = useNavigate();

  // 🔒 Protect dashboard: redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  const go = (path) => () => navigate(path);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Welcome{user?.name ? `, ${user.name}` : ""}</h1>
        <p className="small">
          Role: <strong>{role || "guest"}</strong>
        </p>
      </header>

      <section className="cards-grid">
        {/* Admin-only cards */}
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

        {/* Employee-only cards */}
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
              onClick={go("/events/mine")}
            />
            <Card
              title="Generate Report"
              description="Create reports for your events."
              onClick={go("/reports/create")}
            />
          </>
        )}

        {/* Regular user / customer */}
        {hasRole("user") && (
          <>
            <Card
              title="Browse Events"
              description="See upcoming events and book tickets."
              onClick={go("/events")}
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

        {/* Shared (admin + employee) */}
        {(hasRole("admin", "employee")) && (
          <Card
            title="Shared Reports"
            description="Both admin and employees can generate these reports."
            onClick={go("/reports/shared")}
          />
        )}

        {/* Public card */}
        <Card
          title="Help & Support"
          description="Read docs or contact support for help."
          onClick={go("/support")}
        />
      </section>
    </div>
  );
}

export default Dashboard;
