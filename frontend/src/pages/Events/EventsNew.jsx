import React, { useState } from "react";
import { createEvent } from "../../services/eventsService";
import "./Events.css";

function EventsNew() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createEvent(formData); // send data to backend
      alert("Event created successfully!");
      setFormData({ title: "", date: "", location: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="events-new">
      <h2>Add New Event 🎉</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Event location"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the event..."
            rows="4"
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Save Event
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default EventsNew;
