import React, { useState } from "react";
import { useEvent } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";

const CreateEvent = () => {
  const { createEvent } = useEvent();
  const { user } = useAuth();

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: 0,
  });

  const [message, setMessage] = useState("");

  if (!user || (user.role !== "admin" && user.role !== "employee")) {
    return <p className="text-center mt-10 text-red-600">Access denied</p>;
  }

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await createEvent(eventData);
      setEventData({ title: "", description: "", date: "", time: "", location: "", price: 0 });
      setMessage("Event created successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Event</h2>

        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={eventData.title}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-2">
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={eventData.location}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="price"
            placeholder="Event Price (KSh)"
            value={eventData.price}
            onChange={handleChange}
            min="0"
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-colors"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
