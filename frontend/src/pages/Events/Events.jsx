// src/pages/Events/Events.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import api from "../../services/api"; // still keep api for later
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Temporary mock events for frontend testing
    const mockEvents = [
      {
        _id: "1",
        name: "Summer Music Festival",
        description: "Live music, food, and fun for everyone!",
        price: 1500,
        date: "2025-09-10T12:00:00.000Z",
      },
      {
        _id: "2",
        name: "Tech Conference 2025",
        description: "Learn about the latest in software development.",
        price: 3000,
        date: "2025-10-05T09:00:00.000Z",
      },
      {
        _id: "3",
        name: "Charity Run",
        description: "Run for a cause and support local charities.",
        price: 500,
        date: "2025-08-30T07:00:00.000Z",
      },
    ];

    setEvents(mockEvents);

    // ✅ Uncomment the below when backend is ready
    /*
    api.get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Failed to fetch events:", err));
    */
  }, []);

  const handleBuyTicket = async (eventId, price) => {
    setProcessing(true);
    try {
      // simulate checkout API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/checkout/success"); // redirect to success page
    } catch (err) {
      console.error("Payment error:", err);
      navigate("/checkout/failure"); // redirect to failure page
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="events-page">
      <h1>Events 🎉</h1>
      <p>Browse and book amazing events.</p>

      <div className="events-grid">
        {events.map((event) => (
          <div className="event-card" key={event._id}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p><strong>Price:</strong> KES {event.price}</p>
            <button
              className="buy-btn"
              disabled={processing}
              onClick={() => handleBuyTicket(event._id, event.price)}
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
