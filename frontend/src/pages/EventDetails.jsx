import React from "react";
import { useParams } from "react-router-dom";
import { useEventContext } from "../context/EventContext";

export default function EventDetails() {
  const { id } = useParams();
  const { events } = useEventContext();

  const event = events.find((e) => e.id === Number(id));

  if (!event) return <p className="p-6 text-red-500">Event not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <p className="text-gray-600 mb-2">Date: {event.date}</p>
      <p>{event.description}</p>
    </div>
  );
}
