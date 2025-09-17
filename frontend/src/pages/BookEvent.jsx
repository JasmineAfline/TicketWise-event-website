import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookEvent() {
  const { id } = useParams(); // grab event id from URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [processing, setProcessing] = useState(false);

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

  // ✅ Handle checkout with STK Push
  const handlePayment = async () => {
    try {
      setProcessing(true);

      const amount = event.price * quantity; // ✅ Calculate amount here

      const res = await axios.post("http://localhost:5000/api/payments/initiate", {
        eventId: id,
        phoneNumber: phone,
        amount, // ✅ send amount instead of quantity
      });

      alert("✅ STK Push sent. Enter your PIN on phone.");
      console.log("STK Response:", res.data);

      // Optionally redirect
      navigate("/");
    } catch (err) {
      console.error("❌ Payment failed:", err.response?.data || err.message);
      alert("❌ Failed to initiate payment. Try again.");
    } finally {
      setProcessing(false);
    }
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

        {/* Phone Input */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Phone Number</label>
          <input
            type="text"
            placeholder="2547XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Quantity Input */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={processing}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-500 transition disabled:bg-gray-400"
        >
          {processing ? "Processing..." : "Pay with M-Pesa"}
        </button>
      </div>
    </div>
  );
}
