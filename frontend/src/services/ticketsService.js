import api from "./api";

// Buy a ticket (protected route → triggers STK Push)
export const buyTicket = async (ticketData) => {
  const { data } = await api.post("/payments/stkpush", ticketData);
  return data;
};


// Get all tickets for the logged-in user (protected)
export const getUserTickets = async () => {
  const { data } = await api.get("/tickets/my");
  return data;
};

// Get a single ticket by ID (protected)
export const getTicketById = async (id) => {
  const { data } = await api.get(`/tickets/${id}`);
  return data;
};

// Cancel a ticket (protected)
export const cancelTicket = async (id) => {
  const { data } = await api.delete(`/tickets/${id}`);
  return data;
};
