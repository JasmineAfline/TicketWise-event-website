import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Checkout() {
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${apiUrl}/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handlePayment = async () => {
    if (!phone) return alert("Please enter your phone number");

    // Convert 0715... â†’ +254715...
    const formattedPhone = phone.startsWith("0") ? "+254" + phone.slice(1) : phone;

    setPaying(true);
    try {
      const res = await axios.post(`${apiUrl}/payments/${id}`, {
        phoneNumber: formattedPhone,
        amount: event.price,
      });

      console.log(res.data);
      alert("Payment prompt sent! Check your phone.");
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);
      alert("Failed to initiate payment. Try again.");
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading event...</p>;
  if (!event) return <p className="text-center mt-10">Event not found</p>;

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

        <input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full mb-4 rounded-lg"
        />

        <button
          onClick={handlePayment}
          disabled={paying}
          className={`w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition ${
            paying ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {paying ? "Processing..." : "Proceed to Pay"}
        </button>
      </div>
    </div>
  );
}

