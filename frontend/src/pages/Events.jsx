// src/pages/Events.jsx
import React, { useEffect, useState } from "react";
import { useEvent } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";

const Events = () => {
  const { events, loading, fetchEvents, deleteEvent, bookEvent } = useEvent();
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleBook = async (eventId) => {
    if (!user) {
      setMessage("You must be logged in to book an event.");
      return;
    }

    const phoneNumber = prompt("Enter your phone number for M-Pesa payment:");
    if (!phoneNumber) {
      setMessage("Booking cancelled: phone number required.");
      return;
    }

    setMessage("");
    try {
      const res = await bookEvent(eventId, phoneNumber);
      setMessage(res.message || "Booking initiated. Check your phone for STK push.");
      fetchEvents(); // refresh events if needed
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to book event.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    setMessage("");
    try {
      await deleteEvent(id);
      setMessage("Event deleted successfully.");
    } catch (err) {
      setMessage(err.message || "Failed to delete event.");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Events</h1>

        {message && (
          <p
            className={`mb-4 text-center ${
              message.toLowerCase().includes("success") || message.toLowerCase().includes("initiated")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {loading ? (
          <p className="text-center">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-600">No events found</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white p-4 rounded shadow flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                  <p className="text-gray-700 mb-1">{event.description}</p>
                  <p className="text-gray-500 text-sm">
                    Date: {new Date(event.date).toLocaleDateString()} | Time: {new Date(event.date).toLocaleTimeString()}
                  </p>
                  <p className="text-gray-500 text-sm">Location: {event.location}</p>
                  <p className="text-gray-500 text-sm font-semibold">Price: KSh {event.price}</p>
                </div>

                <div className="mt-3 flex gap-2">
                  {user?.role === "user" && event.price > 0 && (
                    <button
                      onClick={() => handleBook(event._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
                    >
                      Book
                    </button>
                  )}

                  {(user?.role === "admin" || user?.role === "employee") && (
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
