import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Correct URL: /api/events
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading events...</p>;
  if (events.length === 0) return <p className="text-center mt-10">No events available</p>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl grid gap-6 sm:grid-cols-2">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-1">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-1">Location: {event.location}</p>
              <p className="text-purple-600 font-bold text-lg mb-4">
                Price: KES {event.price}
              </p>
            </div>
            <Link
              to={`/book/${event._id}`}
              className="mt-auto bg-purple-600 text-white px-4 py-2 rounded-lg text-center hover:bg-purple-500 transition"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
