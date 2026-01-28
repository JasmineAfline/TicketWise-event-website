import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    date: "",
    price: "",
    availableTickets: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("https://ticketwise-backend.onrender.com/api/events", form);
      alert("âœ… Event created successfully!");
      navigate("/admin/manage-events"); // âœ… redirect after success
    } catch (err) {
      console.error("âŒ Error creating event:", err.response?.data || err.message);
      alert("âŒ Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Event Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="availableTickets"
          value={form.availableTickets}
          onChange={handleChange}
          placeholder="Available Tickets"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;

