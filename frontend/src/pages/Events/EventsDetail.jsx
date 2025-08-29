import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../services/eventsService";
import "./Events.css";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load event details");
      }
    };
    fetchEvent();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="event-detail">
      <h2>{event.title}</h2>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong></p>
      <p>{event.description}</p>
    </div>
  );
}

export default EventDetail;
