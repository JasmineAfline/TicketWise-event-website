import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tickets/my-tickets", {
          withCredentials: true, 
        });
        setTickets(res.data);
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="mb-6">
        <p className="text-gray-700">View and update your account details here.</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">🎟️ My Tickets</h2>

      {loading ? (
        <p>Loading your tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-gray-500">You haven’t bought any tickets yet.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-semibold">{ticket.event.title}</h3>
              <p>{ticket.event.description}</p>
              <p>Date: {new Date(ticket.event.date).toLocaleString()}</p>
              <p className="font-bold text-purple-600">KES {ticket.event.price}</p>
              <p className="text-green-600"> Ticket Purchased</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
