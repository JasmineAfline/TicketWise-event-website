// src/pages/Events.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events"); // ✅ Adjust if needed
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleBook = (id) => {
    navigate(`/book/${id}`); // ✅ Now used
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Upcoming Events 🎉</h1>
        <p className="text-gray-600">
          Browse and book your favorite events easily with Tickewise.
        </p>
      </section>

      {/* Events Grid */}
      <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">{event.location}</p>
              <p className="text-purple-600 font-bold mt-2">
                KES {event.price}
              </p>
              <button
                onClick={() => handleBook(event._id)} // ✅ Fixed
                className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
