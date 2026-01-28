// src/context/EventContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const EventContext = createContext();
export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Axios instance with auth header
  const axiosInstance = axios.create({
    baseURL: "https://ticketwise-backend.onrender.com/api",
  });

  axiosInstance.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // Fetch all events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/events");
      setEvents(res.data.events || res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Create new event
  const createEvent = async (newEvent) => {
    try {
      const res = await axiosInstance.post("/events", newEvent);
      setEvents((prev) => [...prev, res.data.event || res.data]);
      return res.data;
    } catch (err) {
      console.error("Create event error:", err);
      throw new Error(err.response?.data?.message || "Failed to create event");
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    try {
      await axiosInstance.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Delete event error:", err);
      throw new Error(err.response?.data?.message || "Failed to delete event");
    }
  };

  // Update event
  const updateEvent = async (id, updatedData) => {
    try {
      const res = await axiosInstance.put(`/events/${id}`, updatedData);
      setEvents((prev) =>
        prev.map((e) => (e._id === id ? res.data.event || res.data : e))
      );
      return res.data;
    } catch (err) {
      console.error("Update event error:", err);
      throw new Error(err.response?.data?.message || "Failed to update event");
    }
  };

  // âœ… Fixed Book event
  const bookEvent = async (eventId, phoneNumber) => {
    if (!user) throw new Error("You must be logged in to book an event.");
    if (!phoneNumber) throw new Error("Phone number is required for booking.");
    
    try {
      const res = await axiosInstance.post("/bookings", {
        eventId,
        phoneNumber,
      });
      return res.data;
    } catch (err) {
      console.error("Book event error:", err);
      throw new Error(err.response?.data?.message || "Failed to book event");
    }
  };

  // Fetch events on mount
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/events");
        setEvents(res.data.events || res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        fetchEvents,
        createEvent,
        deleteEvent,
        updateEvent,
        bookEvent, 
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
