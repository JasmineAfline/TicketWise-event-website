import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

// Axios instance with dynamic token
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const Dashboard = () => {
  const { user } = useAuth();
  const [section, setSection] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editEventData, setEditEventData] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [newEventData, setNewEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: 0,
  });

  // Fetch data
  const fetchData = async (type) => {
    setLoading(true);
    try {
      let url = "";
      switch (type) {
        case "users":
          url = "/users";
          break;
        case "events":
          url = user.role === "employee" ? "/events/my" : "/events";
          break;
        case "bookings":
          url = user.role === "user" ? "/bookings/my" : "/bookings";
          break;
        default:
          setData([]);
          return;
      }

      const res = await axiosInstance.get(url);

      if (res.data.users) setData(res.data.users);
      else if (res.data.events) setData(res.data.events);
      else if (res.data.bookings) setData(res.data.bookings);
      else if (Array.isArray(res.data)) setData(res.data);
      else setData([]);
    } catch (err) {
      console.error("Error fetching data:", err.response?.data || err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Render table by section
  const renderTable = () => {
    if (loading) return <p className="mt-6 text-gray-600">Loading...</p>;

    switch (section) {
      case "manageUsers":
        return (
          <Table
            headers={["Name", "Email", "Role", "Action"]}
            rows={data.map((u) => [
              u.name,
              u.email,
              u.role,
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(u._id, "users")}
              >
                Delete
              </button>,
            ])}
          />
        );

      case "manageEvents":
        return (
          <div className="mt-6">
            <Table
              headers={["Title", "Description", "Date"]}
              rows={data.map((event) => [
                event.title,
                event.description,
                event.date,
              ])}
            />
          </div>
        );

      case "viewPayments":
        return (
          <Table
            headers={["User", "Event", "Status", "Price"]}
            rows={data.map((b) => [
              b.user?.name || "-",
              b.event?.title || "-",
              b.status || "-",
              b.event?.price || 0,
            ])}
          />
        );

      /* =========================
         ✅ REPORTS SECTION (ADDED)
         ========================= */
      case "reports":
        return (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">Total Records</p>
              <h2 className="text-2xl font-bold">{data.length}</h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">Section Type</p>
              <h2 className="text-xl font-semibold capitalize">
                {section}
              </h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">Status</p>
              <h2 className="text-xl font-semibold text-green-600">
                Active
              </h2>
            </div>
          </div>
        );

      default:
        return <p className="mt-6 text-gray-600">Select an action to view data</p>;
    }
  };

  // Delete handler
  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const url = type === "users" ? `/users/${id}` : `/events/${id}`;
      await axiosInstance.delete(url);
      setData((prev) => prev.filter((item) => item._id !== id));
      alert("Deleted.");
    } catch {
      alert("Delete failed.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-wrap gap-4">
        {user.role === "admin" && (
          <>
            <DashboardButton
              label="Manage Users"
              onClick={() => {
                setSection("manageUsers");
                fetchData("users");
              }}
            />
            <DashboardButton
              label="Manage Events"
              onClick={() => {
                setSection("manageEvents");
                fetchData("events");
              }}
            />
            <DashboardButton
              label="View Payments"
              onClick={() => {
                setSection("viewPayments");
                fetchData("bookings");
              }}
            />
            <DashboardButton
              label="Reports"
              onClick={() => {
                setSection("reports");
                fetchData("users"); // mock data source
              }}
            />
          </>
        )}
      </div>

      {renderTable()}
    </div>
  );
};

// Reusable components
const DashboardButton = ({ label, onClick }) => (
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    onClick={onClick}
  >
    {label}
  </button>
);

const Table = ({ headers, rows }) => (
  <div className="bg-white shadow-md rounded p-4 overflow-x-auto mt-6">
    <table className="min-w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          {headers.map((h, idx) => (
            <th key={idx} className="p-2 border">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {r.map((cell, cIdx) => (
              <td key={cIdx} className="p-2 border">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Dashboard;
