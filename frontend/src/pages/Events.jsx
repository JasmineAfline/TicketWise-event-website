import React, { useEffect, useState } from "react";
import { useEvent } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const { events, loading, fetchEvents, deleteEvent, bookEvent } = useEvent();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Search and filter functionality
  useEffect(() => {
    if (!searchTerm) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [searchTerm, events]);

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

  const handleEventCardClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500 rounded-full blur-3xl animate-bounce"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4 animate-fade-in-down">
          Upcoming Events 🎫
        </h1>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <input
            type="text"
            placeholder="Search events by title, description, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-2xl px-6 py-3 rounded-full border-2 border-purple-300 bg-white shadow-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-300 transition-all duration-300"
          />
        </div>

        {message && (
          <p
            className={`mb-6 text-center font-semibold text-lg animate-pulse ${
              message.toLowerCase().includes("success") || message.toLowerCase().includes("initiated")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-600 text-lg py-12">
            {searchTerm ? `No events found matching "${searchTerm}"` : "No events found"}
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col transform hover:scale-105 hover:-translate-y-2 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="relative h-48 w-full overflow-hidden cursor-pointer"
                  onClick={() => handleEventCardClick(event._id)}
                >
                  <img
                    src={getImagePath(event.title)}
                    alt={event.title}
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white font-semibold">View Details</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">{event.title}</h3>
                    <p className="text-gray-600 mb-1 line-clamp-3">{event.description}</p>
                    <p className="text-gray-500 text-sm">
                      📅 {new Date(event.date).toLocaleDateString()} | ⏰{" "}
                      {new Date(event.date).toLocaleTimeString()}
                    </p>
                    <p className="text-gray-500 text-sm">📍 {event.location}</p>
                    <p className="text-purple-600 text-sm font-bold mt-2">KSh {event.price}</p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEventCardClick(event._id)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold"
                    >
                      View Details
                    </button>
                    {user?.role === "user" && event.price > 0 && (
                      <button
                        onClick={() => handleBook(event._id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold"
                      >
                        Book
                      </button>
                    )}
                    {(user?.role === "admin" || user?.role === "employee") && (
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold"
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh] transform scale-100 animate-fade-in">
              <button
                className="absolute top-4 right-4 text-gray-600 text-3xl font-bold hover:text-gray-900 hover:scale-125 transition-all duration-300"
                onClick={() => setSelectedEvent(null)}
              >
                ×
              </button>
              <img
                src={getImagePath(selectedEvent.title)}
                alt={selectedEvent.title}
                className="h-64 w-full object-cover rounded-2xl mb-4 hover:scale-105 transition-transform duration-300"
              />
              <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                {selectedEvent.title}
              </h2>
              <p className="text-gray-600 mb-1">
                📅 {new Date(selectedEvent.date).toLocaleDateString()} | ⏰{" "}
                {new Date(selectedEvent.date).toLocaleTimeString()}
              </p>
              <p className="text-gray-600 mb-4">📍 {selectedEvent.location}</p>
              <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                <span className="font-bold text-purple-600 text-2xl">KSh {selectedEvent.price}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedEvent(null);
                      handleEventCardClick(selectedEvent._id);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg text-white px-6 py-2 rounded-xl transition-all duration-300 font-semibold"
                  >
                    Full Details
                  </button>
                  {user?.role === "user" && (
                    <button
                      onClick={() => handleBook(selectedEvent._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition-all duration-300 font-semibold"
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
