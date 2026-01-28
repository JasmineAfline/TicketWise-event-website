import { useEffect, useState } from "react";
import axios from "axios";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // âœ… Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://ticketwise-backend.onrender.com/api/events");
      setEvents(res.data.data || res.data); // adjust if API wraps data
    } catch (err) {
      console.error("âŒ Error fetching events:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // âœ… Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`https://ticketwise-backend.onrender.com/api/events/${id}`);
      setEvents(events.filter((event) => event._id !== id)); // update UI instantly
      alert("âœ… Event deleted successfully");
    } catch (err) {
      console.error("âŒ Error deleting event:", err.response?.data || err.message);
      alert("âŒ Failed to delete event");
    }
  };

  // âœ… Edit event (simple example: prompt user, you can replace with modal/form later)
  const handleEdit = async (id) => {
    const newName = window.prompt("Enter new event name:");
    if (!newName) return;

    try {
      const res = await axios.put(`https://ticketwise-backend.onrender.com/api/events/${id}`, {
        name: newName,
      });

      setEvents(events.map((event) => (event._id === id ? res.data : event)));
      alert("âœ… Event updated successfully");
    } catch (err) {
      console.error("âŒ Error updating event:", err.response?.data || err.message);
      alert("âŒ Failed to update event");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-600">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-sm uppercase tracking-wide text-gray-600">
                <th className="px-4 py-3 border-b">Event Name</th>
                <th className="px-4 py-3 border-b">Date</th>
                <th className="px-4 py-3 border-b">Price</th>
                <th className="px-4 py-3 border-b">Tickets</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, idx) => (
                <tr
                  key={event._id}
                  className={`hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-4 py-3 border-b">{event.name || event.title}</td>
                  <td className="px-4 py-3 border-b">
                    {event.date ? new Date(event.date).toLocaleDateString() : "â€”"}
                  </td>
                  <td className="px-4 py-3 border-b">KES {event.price}</td>
                  <td className="px-4 py-3 border-b">{event.availableTickets}</td>
                  <td className="px-4 py-3 border-b text-center space-x-2">
                    <button
                      onClick={() => handleEdit(event._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;

