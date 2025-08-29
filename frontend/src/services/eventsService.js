import api from "./api";

// Get all events (public or protected depending on backend)
export const getEvents = async () => {
  const { data } = await api.get("/events");
  return data;
};

// Get single event by ID
export const getEventById = async (id) => {
  const { data } = await api.get(`/events/${id}`);
  return data;
};

// Create a new event (protected: admin/employee)
export const createEvent = async (eventData) => {
  const { data } = await api.post("/events", eventData);
  return data;
};

// Update an existing event (protected: admin/employee)
export const updateEvent = async (id, eventData) => {
  const { data } = await api.put(`/events/${id}`, eventData);
  return data;
};

// Delete an event (protected: admin/employee)
export const deleteEvent = async (id) => {
  const { data } = await api.delete(`/events/${id}`);
  return data;
};
