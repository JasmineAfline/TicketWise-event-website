// pages/Events/MyTickets.jsx
import { useEffect, useState } from "react";
import api from "../../api/api";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get("/tickets/my");
        setTickets(res.data);
      } catch (err) {
        setMessage("Error fetching tickets.");
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">My Tickets</h2>
      {message && <p>{message}</p>}
      {tickets.length === 0 ? (
        <p>No tickets purchased yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="border p-4 rounded">
              <h3 className="text-xl">{ticket.eventTitle}</h3>
              <p>Date: {ticket.eventDate}</p>
              <p>Location: {ticket.eventLocation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;

