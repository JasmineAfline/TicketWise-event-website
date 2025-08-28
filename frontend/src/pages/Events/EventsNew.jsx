import React, { useState } from "react";
import "./Events.css";

function EventsNew() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 For now we just log, later this will POST to backend API
    console.log("New Event Data:", formData);

    // Reset form
    setFormData({
      title: "",
      date: "",
      location: "",
      description: "",
    });
    alert("Event created successfully (dummy for now)!");
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
          ></textarea>
        </div>

        <button type="submit" className="btn-submit">
          Save Event
        </button>
      </form>
    </div>
  );
}

export default EventsNew;
