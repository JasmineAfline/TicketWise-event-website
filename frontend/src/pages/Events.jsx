import React, { useEffect, useState } from "react";
import { useEvent } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";

const Events = () => {
  const { events, loading, fetchEvents, deleteEvent, bookEvent } = useEvent();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      fetchEvents();
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

  const eventImages = {
    "Charity Run": "/images/Run.jpg",
    "Tech Conference": "/images/tech_event.jpg",
    "Music Festival": "/images/music_festival.jpg",
    "Food Carnival": "/images/food_carnival.jpg",
    "Tech Expo": "/images/Tech.jpg",
    "Music Concert": "/images/Music.jpg",
    "Summer Music Festival": "/images/Music.jpg",
  };

  const getImagePath = (title) => eventImages[title] || "/images/Tech.jpg";

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Upcoming Events 🎫</h1>

        {message && (
          <p
            className={`mb-6 text-center ${
              message.toLowerCase().includes("success") || message.toLowerCase().includes("initiated")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-600">No events found</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer flex flex-col"
              >
                <img
                  src={getImagePath(event.title)}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                  onClick={() => setSelectedEvent(event)}
                />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-1 line-clamp-3">{event.description}</p>
                    <p className="text-gray-500 text-sm">
                      Date: {new Date(event.date).toLocaleDateString()} | Time:{" "}
                      {new Date(event.date).toLocaleTimeString()}
                    </p>
                    <p className="text-gray-500 text-sm">Location: {event.location}</p>
                    <p className="text-gray-500 text-sm font-semibold">Price: KSh {event.price}</p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {user?.role === "user" && event.price > 0 && (
                      <button
                        onClick={() => handleBook(event._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        Book
                      </button>
                    )}
                    {(user?.role === "admin" || user?.role === "employee") && (
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
              <button
                className="absolute top-4 right-4 text-gray-600 text-2xl font-bold hover:text-gray-900"
                onClick={() => setSelectedEvent(null)}
              >
                ×
              </button>
              <img
                src={getImagePath(selectedEvent.title)}
                alt={selectedEvent.title}
                className="h-64 w-full object-cover rounded-2xl mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
              <p className="text-gray-600 mb-1">
                Date: {new Date(selectedEvent.date).toLocaleDateString()} | Time:{" "}
                {new Date(selectedEvent.date).toLocaleTimeString()}
              </p>
              <p className="text-gray-600 mb-4">Location: {selectedEvent.location}</p>
              <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-purple-600 text-xl">KSh {selectedEvent.price}</span>
                <button
                  onClick={() => handleBook(selectedEvent._id)}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-xl transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
