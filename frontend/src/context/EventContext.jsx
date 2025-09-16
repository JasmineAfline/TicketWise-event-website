// src/context/EventContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const EventContext = createContext();

// Custom hook for easy usage
export const useEventContext = () => useContext(EventContext);

// Provider component
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example: fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events"); // adjust backend URL
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Add new event
  const addEvent = (event) => {
    setEvents((prev) => [...prev, event]);
  };

  // Delete event
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  // Update event
  const updateEvent = (id, updatedData) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...updatedData } : event))
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        addEvent,
        deleteEvent,
        updateEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
