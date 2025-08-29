import api from "./api";

// Get all sales reports (admin/employee only)
export const getSalesReports = async () => {
  const { data } = await api.get("/reports/sales");
  return data;
};

// Get event-specific report (admin/employee only)
export const getEventReport = async (eventId) => {
  const { data } = await api.get(`/reports/event/${eventId}`);
  return data;
};

// Generate a custom report (protected)
export const generateReport = async (reportData) => {
  const { data } = await api.post("/reports/generate", reportData);
  return data;
};
