// pages/Events/BuyTicket.jsx
import { useEffect, useState } from "react";
import api from "../../api/api";

const BuyTicket = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (err) {
        setMessage("Error fetching events.");
      }
    };
    fetchEvents();
  }, []);

  const handleBuy = async (eventId) => {
    try {
      await api.post(`/tickets/${eventId}/buy`);
      setMessage("Ticket purchased successfully!");
    } catch (err) {
      setMessage("Error purchasing ticket.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Buy Tickets</h2>
      {message && <p>{message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded">
            <h3 className="text-xl">{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded mt-2"
              onClick={() => handleBuy(event.id)}
            >
              Buy Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyTicket;
