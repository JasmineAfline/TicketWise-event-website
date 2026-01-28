import React from "react";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{event.name}</h2>
      <p className="text-gray-600">{event.date}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => navigate(`/events/${event.id}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          View
        </button>
        <button
          onClick={() => navigate("/create")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Create
        </button>
      </div>
    </div>
  );
}
