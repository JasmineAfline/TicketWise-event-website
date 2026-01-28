import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Booking = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBookingsData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data.bookings);
      } catch (err) {
        setMessage(err.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookingsData();
  }, [token]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
      setMessage("Booking cancelled successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Bookings</h1>

        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {loading ? (
          <p className="text-center">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-600">No bookings found</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white p-4 rounded shadow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">{booking.event.title}</h3>
                  <p className="text-gray-700 mb-1">{booking.event.description}</p>
                  <p className="text-gray-500 text-sm">
                    Date: {booking.event.date} | Time: {booking.event.time}
                  </p>
                  <p className="text-gray-500 text-sm">Location: {booking.event.location}</p>
                  <p className="text-gray-500 text-sm font-semibold">Price: KSh {booking.event.price}</p>
                  <p className="mt-2 font-medium">
                    Status:{" "}
                    <span
                      className={`${
                        booking.status === "paid" ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                </div>

                <div className="mt-3 flex gap-2">
                  {booking.status !== "paid" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                    >
                      Cancel
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

export default Booking;
