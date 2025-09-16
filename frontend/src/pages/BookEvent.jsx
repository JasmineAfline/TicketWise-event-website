import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookEvent() {
  const { id } = useParams(); // grab event id from URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading event...</p>;
  if (!event) return <p className="text-center mt-10">Event not found</p>;

  const handleBooking = () => {
    // Navigate to the checkout page with the event id
    navigate(`/checkout/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="text-gray-600 mb-2">
          Date: {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-2">Location: {event.location}</p>
        <p className="text-purple-600 font-bold text-lg mb-6">
          Price: KES {event.price}
        </p>

        <button
          onClick={handleBooking}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-500 transition"
        >
          Proceed to Book
        </button>
      </div>
    </div>
  );
}
