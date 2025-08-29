import React, { useEffect, useState } from "react";
import { getEvents } from "../../services/eventsService";
import { Link } from "react-router-dom";
import "./Events.css";

function EventsList() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load events");
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="events-list">
      <h2>All Events</h2>
        <Link to="/checkout" className="hero-btn"></Link>
      {error && <p className="error">{error}</p>}
      {events.length === 0 ? (
        <p>No events available.</p>

      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <Link to={`/events/${event._id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventsList;
