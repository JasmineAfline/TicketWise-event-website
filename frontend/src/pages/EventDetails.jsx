import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import { ChevronLeft, Calendar, MapPin, Banknote, Share2 } from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, deleteEvent, bookEvent } = useEvent();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const selected = events.find((e) => e._id === id);
    if (selected) {
      setEvent(selected);
      setIsLoading(false);
    }
  }, [events, id]);

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
      const res = await bookEvent(event._id, phoneNumber);
      if (res.booking?.status === "pending") {
        alert("STK Push sent! Please complete payment on your phone.");
      }
      setMessage(res.message || "Booking initiated. Check your phone for STK push.");
    } catch (err) {
      setMessage(err.message);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-600 text-lg font-semibold">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/events")}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500 rounded-full blur-3xl animate-bounce"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <button
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/events");
          }}
          className="flex items-center gap-2 text-purple-600 hover:text-pink-500 mb-6 transition-colors duration-300 font-semibold group animate-fade-in-left"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Events
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 animate-fade-in-up">
          <div className="relative h-96 w-full overflow-hidden group">
            <img
              src={getImagePath(event.title)}
              alt={event.title}
              className="h-96 w-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          <div className="p-8 md:p-12">
            {message && (
              <div
                className={`mb-6 p-4 rounded-xl text-center font-semibold animate-pulse ${
                  message.toLowerCase().includes("success") || message.toLowerCase().includes("initiated")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
                {event.title}
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-purple-600">KSh {event.price}</span>
                {event.price === 0 && <span className="text-lg font-semibold text-green-600">FREE EVENT</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-purple-50 p-4 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 text-purple-600">
                  <Calendar className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-semibold text-sm">{new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-sm">{new Date(event.date).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 p-4 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 text-pink-600">
                  <MapPin className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{event.location}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 text-blue-600">
                  <Banknote className="w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold">KSh {event.price}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {user?.role === "user" && event.price > 0 && (
                <button
                  onClick={handleBook}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Book Now
                </button>
              )}
              {user?.role === "user" && event.price === 0 && (
                <button
                  onClick={handleBook}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Register for Free
                </button>
              )}

              {(user?.role === "admin" || user?.role === "employee") && (
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Delete Event
                </button>
              )}

              {!user && (
                <button
                  onClick={() => navigate("/login")}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Login to Book
                </button>
              )}

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: event.title,
                      text: event.description,
                      url: window.location.href,
                    });
                  }
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
