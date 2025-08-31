// pages/Admin/AddEvent.jsx
import { useState } from "react";
import api from "../../api/api"; // Adjust if your path differs

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/events", { title, date, location });
      setMessage("Event added successfully!");
      setTitle("");
      setDate("");
      setLocation("");
    } catch (err) {
      setMessage("Error adding event.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Add Event</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
