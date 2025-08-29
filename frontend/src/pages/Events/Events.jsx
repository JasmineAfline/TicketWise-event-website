// src/pages/Events/Events.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Events.css";

function Events({ embedded = false }) {
  const { role } = useAuth();
  const [events, setEvents] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    price: "",
    date: "",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Temporary mock events
    const mockEvents = [
      {
        _id: "1",
        name: "Summer Music Festival",
        description: "Live music, food, and fun for everyone!",
        price: 1500,
        date: "2025-09-10T12:00:00.000Z",
        image: "/images/Music.jpg",
      },


      
      {
        _id: "2",
        name: "Tech Conference 2025",
        description: "Learn about the latest in software development.",
        price: 3000,
        date: "2025-10-05T09:00:00.000Z",
        image: "/images/Tech.jpg",
      },

      { _id: "3", name: "Charity Run", description: "Run for a cause and support local charities.", price: 500, date: "2025-08-30T07:00:00.000Z", image: "/images/Run.jpg", },
    ];
    setEvents(mockEvents);
  }, []);

  // 🔹 User: buy ticket
  const handleBuyTicket = async (eventId, price) => {
    setProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/checkout/success");
    } catch (err) {
      console.error("Payment error:", err);
      navigate("/checkout/failure");
    } finally {
      setProcessing(false);
    }
  };

  // 🔹 Employee: add event
  const handleAddEvent = (e) => {
    e.preventDefault();
    const id = Date.now().toString();
    setEvents([...events, { _id: id, ...newEvent }]);
    setNewEvent({ name: "", description: "", price: "", date: "", image: "" });
  };

  // 🔹 Employee: delete event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((evt) => evt._id !== id));
  };

  // 🔹 Employee: edit event (simple inline for now)
  const handleEditEvent = (id, field, value) => {
    setEvents(events.map((evt) => (evt._id === id ? { ...evt, [field]: value } : evt)));
  };

  // ---------- RENDER ----------

  // Employee dashboard view
  if (embedded && role === "employee") {
    return (
      <div className="events-employee">
        <h2>📌 Manage Events</h2>

        {/* Add form */}
        <form className="event-form" onSubmit={handleAddEvent}>
          <input
            type="text"
            placeholder="Event name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price (KES)"
            value={newEvent.price}
            onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
            required
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newEvent.image}
            onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
          />
          <button type="submit">➕ Add Event</button>
        </form>

        {/* Table of events */}
        <table className="events-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Date</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((evt) => (
              <tr key={evt._id}>
                <td>
                  <input
                    value={evt.name}
                    onChange={(e) => handleEditEvent(evt._id, "name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={evt.description}
                    onChange={(e) => handleEditEvent(evt._id, "description", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={evt.price}
                    onChange={(e) => handleEditEvent(evt._id, "price", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={evt.date.slice(0, 10)}
                    onChange={(e) => handleEditEvent(evt._id, "date", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={evt.image}
                    onChange={(e) => handleEditEvent(evt._id, "image", e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleDeleteEvent(evt._id)}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Default: user public list
  return (
    <div className={`events-page ${embedded ? "embedded" : ""}`}>
      {!embedded && <h1>Events 🎉</h1>}
      {!embedded && <p>Browse and book amazing events.</p>}

      <div className="events-grid">
        {events.map((evt) => (
          <div className="event-card" key={evt._id}>
            <img src={evt.image} alt={evt.name} className="event-img" />
            <h3>{evt.name}</h3>
            <p>{evt.description}</p>
            <p><strong>Price:</strong> KES {evt.price}</p>
            <button
              className="buy-btn"
              disabled={processing}
              onClick={() => handleBuyTicket(evt._id, evt.price)}
            >
              {processing ? "Processing..." : "Buy Ticket"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
