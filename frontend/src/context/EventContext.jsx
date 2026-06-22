// src/context/EventContext.jsx
import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const EventContext = createContext();
export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL =
    process.env.REACT_APP_API_URL
      ? `${process.env.REACT_APP_API_URL}/api`
      : "https://ticketwise-backend.onrender.com/api";

  // Axios instance
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: API_BASE_URL,
    });

    instance.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    return instance;
  }, [API_BASE_URL, token]);

  // Fetch all events
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/events");
      setEvents(res.data.events || res.data);
    } catch (err) {
      console.error("Error fetching events:", err.response?.data || err.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [axiosInstance]);

  // Create new event
  const createEvent = async (newEvent) => {
    try {
      const res = await axiosInstance.post("/events", newEvent);
      setEvents((prev) => [...prev, res.data.event || res.data]);
      return res.data;
    } catch (err) {
      console.error("Create event error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Failed to create event");
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    try {
      await axiosInstance.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Delete event error:", err.response?.data || err.message);
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
      console.error("Update event error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Failed to update event");
    }
  };

  // Book event
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
      console.error("Book event error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Failed to book event");
    }
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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