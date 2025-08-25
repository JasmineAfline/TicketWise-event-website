// src/api/events.js
import API from "./api";

// Get all events
export const getEvents = async () => {
  const response = await API.get("/events");
  return response.data;
};

// Add a new event
export const addEvent = async (eventData) => {
  const response = await API.post("/events", eventData);
  return response.data;
};

// Delete an event
export const deleteEvent = async (eventId) => {
  const response = await API.delete(`/events/${eventId}`);
  return response.data;
};
