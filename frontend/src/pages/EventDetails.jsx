import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, deleteEvent, bookEvent } = useEvent();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const selected = events.find((e) => e._id === id);
    if (selected) setEvent(selected);
  }, [events, id]);

  if (!event) return <p className="text-center mt-10 text-gray-600">Loading event...</p>;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(event._id);
      navigate("/events");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleBook = async () => {
    setMessage("");
    try {
      const res = await bookEvent(event._id);
      if (res.booking?.status === "pending") {
        alert("STK Push sent! Please complete payment on your phone.");
      }
      setMessage(res.message || "Booking initiated. Check your phone for STK push.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{event.title}</h1>

        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-gray-700 mb-2">{event.description}</p>
        <p className="text-gray-500 mb-1">Date: {event.date}</p>
        <p className="text-gray-500 mb-1">Time: {event.time}</p>
        <p className="text-gray-500 mb-1">Location: {event.location}</p>
        <p className="text-gray-500 mb-4 font-semibold">Price: KSh {event.price}</p>

        <div className="flex gap-2">
          {user?.role === "user" && (
            <button
              onClick={handleBook}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
            >
              Book Event
            </button>
          )}
          {(user?.role === "admin" || user?.role === "employee") && (
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
              Delete Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
