import React, { useEffect, useState } from "react";
import { useEvent } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BsCalendarEvent, BsClock, BsGeoAlt } from "react-icons/bs";

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
    <div className="min-h-screen bg-[#F5F3FF] p-4 overflow-hidden pt-20">
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">
          Upcoming Events
        </h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search events by title, description, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-2xl px-5 py-2.5 rounded-full border border-purple-200 bg-white shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
          />
        </div>

        {message && (
          <p
            className={`mb-4 text-center font-semibold text-sm ${
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
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEvents.map((event, index) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col transform hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Image with overlaid badge and price */}
                <div
                  className="relative h-40 w-full overflow-hidden cursor-pointer"
                  onClick={() => handleEventCardClick(event._id)}
                >
                  <img
                    src={getImagePath(event.title)}
                    alt={event.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Price badge overlaid on image */}
                  <div className="absolute top-3 right-3 bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    KSh {event.price}
                  </div>
                </div>
                
                {/* Compact card content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-gray-500 text-xs mb-2 line-clamp-2">{event.description}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <BsCalendarEvent className="text-purple-500" size={12} />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <BsGeoAlt className="text-purple-500" size={12} />
                        {event.location}
                      </span>
                    </div>
                  </div>

                  {/* Unified purple button styles */}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEventCardClick(event._id)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                    >
                      View
                    </button>
                    {user?.role === "user" && event.price > 0 && (
                      <button
                        onClick={() => handleBook(event._id)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                      >
                        Book
                      </button>
                    )}
                    {(user?.role === "admin" || user?.role === "employee") && (
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
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
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh] transform scale-100">
              <button
                className="absolute top-4 right-4 text-gray-500 text-2xl font-bold hover:text-gray-700 transition-colors"
                onClick={() => setSelectedEvent(null)}
              >
                ×
              </button>
              <img
                src={getImagePath(selectedEvent.title)}
                alt={selectedEvent.title}
                className="h-48 w-full object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {selectedEvent.title}
              </h2>
              <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">
                <BsCalendarEvent className="text-purple-500" size={14} /> {new Date(selectedEvent.date).toLocaleDateString()} |
                <BsClock className="text-purple-500" size={14} /> {new Date(selectedEvent.date).toLocaleTimeString()}
              </p>
              <p className="text-gray-500 text-sm mb-3 flex items-center gap-2">
                <BsGeoAlt className="text-purple-500" size={14} /> {selectedEvent.location}
              </p>
              <p className="text-gray-600 text-sm mb-4">{selectedEvent.description}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                <span className="font-bold text-purple-600 text-xl">KSh {selectedEvent.price}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedEvent(null);
                      handleEventCardClick(selectedEvent._id);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Full Details
                  </button>
                  {user?.role === "user" && (
                    <button
                      onClick={() => handleBook(selectedEvent._id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
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
