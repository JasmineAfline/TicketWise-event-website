import React from "react";
import "./Reports.css";

function Reports({ purchases }) {
  // Calculate total revenue
  const totalRevenue = purchases.reduce(
    (sum, p) => sum + p.qty * (p.price || 1000), // default price if not passed
    0
  );

  return (
    <div className="reports-page">
      <h1>Sales & Revenue Reports</h1>

      {purchases.length === 0 ? (
        <p>No ticket purchases yet.</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Tickets Sold</th>
              <th>Phone Number</th>
              <th>Revenue (KES)</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p, index) => (
              <tr key={index}>
                <td>{p.event}</td>
                <td>{p.qty}</td>
                <td>{p.phone}</td>
                <td>{(p.price || 1000) * p.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Total Revenue: {totalRevenue} KES</h2>
    </div>
  );
}

export default Reports;
