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
      // Handle both array and object responses
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

  // Delete handler
  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const url = type === "users" ? `/users/${id}` : `/events/${id}`;
      await axiosInstance.delete(url);
      setData((prev) => prev.filter((item) => item._id !== id));
      alert(`${type === "users" ? "User" : "Event"} deleted.`);
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Delete failed.");
    }
  };

  // Edit event
  const handleEdit = (event) => {
    setEditEventData({ ...event });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) =>
    setEditEventData({ ...editEventData, [e.target.name]: e.target.value });

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/events/${editEventData._id}`, editEventData);
      // Update state with returned event
      setData((prev) =>
        prev.map((ev) => (ev._id === editEventData._id ? res.data.event || editEventData : ev))
      );
      setEditModalOpen(false);
      alert("Event updated.");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Update failed.");
    }
  };

  // Create event
  const handleCreateChange = (e) =>
    setNewEventData({ ...newEventData, [e.target.name]: e.target.value });

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/events", newEventData);
      // Append the created event
      const createdEvent = res.data.event;
      if (createdEvent) setData((prev) => [...prev, createdEvent]);
      else await fetchData("events"); // fallback
      setCreateModalOpen(false);
      setNewEventData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        price: 0,
      });
      alert("Event created.");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Create failed.");
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
            {["admin", "employee"].includes(user.role) && (
              <div className="flex justify-end mb-4">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => setCreateModalOpen(true)}
                >
                  + Create Event
                </button>
              </div>
            )}
            <Table
              headers={["Title", "Description", "Date", "Actions"]}
              rows={data.map((event) => [
                event.title,
                event.description,
                event.date,
                ["admin", "employee"].includes(user.role) ? (
                  <div className="relative">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      onClick={() =>
                        setMenuOpen(menuOpen === event._id ? null : event._id)
                      }
                    >
                      Actions
                    </button>
                    {menuOpen === event._id && (
                      <div className="absolute right-0 mt-2 w-24 bg-white border shadow rounded z-10">
                        <button
                          className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                          onClick={() => {
                            handleEdit(event);
                            setMenuOpen(null);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-red-600"
                          onClick={() => {
                            handleDelete(event._id, "events");
                            setMenuOpen(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-500">-</span>
                ),
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

      default:
        return <p className="mt-6 text-gray-600">Select an action to view data</p>;
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
          </>
        )}
        {user.role === "employee" && (
          <>
            <DashboardButton
              label="Manage Events"
              onClick={() => {
                setSection("manageEvents");
                fetchData("events");
              }}
            />
            <DashboardButton
              label="View Created Events"
              onClick={() => {
                setSection("viewPayments");
                fetchData("bookings");
              }}
            />
          </>
        )}
        {user.role === "user" && (
          <DashboardButton
            label="My Bookings & Payments"
            onClick={() => {
              setSection("viewPayments");
              fetchData("bookings");
            }}
          />
        )}
      </div>

      {renderTable()}

      {/* Modals */}
      {editModalOpen && (
        <Modal title="Edit Event" onClose={() => setEditModalOpen(false)}>
          <EventForm
            data={editEventData}
            onChange={handleEditChange}
            onSubmit={handleEditSubmit}
            submitLabel="Save"
          />
        </Modal>
      )}
      {createModalOpen && (
        <Modal title="Create Event" onClose={() => setCreateModalOpen(false)}>
          <EventForm
            data={newEventData}
            onChange={handleCreateChange}
            onSubmit={handleCreateSubmit}
            submitLabel="Create"
          />
        </Modal>
      )}
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
  <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
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

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
      <div className="flex justify-end mt-2">
        <button
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const EventForm = ({ data, onChange, onSubmit, submitLabel }) => (
  <form onSubmit={onSubmit} className="flex flex-col gap-3">
    <input
      type="text"
      name="title"
      value={data.title || ""}
      onChange={onChange}
      placeholder="Title"
      required
      className="border rounded px-3 py-2"
    />
    <textarea
      name="description"
      value={data.description || ""}
      onChange={onChange}
      placeholder="Description"
      required
      className="border rounded px-3 py-2"
    />
    <div className="flex gap-2">
      <input
        type="date"
        name="date"
        value={data.date || ""}
        onChange={onChange}
        required
        className="border rounded px-3 py-2 w-1/2"
      />
      <input
        type="time"
        name="time"
        value={data.time || ""}
        onChange={onChange}
        required
        className="border rounded px-3 py-2 w-1/2"
      />
    </div>
    <input
      type="text"
      name="location"
      value={data.location || ""}
      onChange={onChange}
      placeholder="Location"
      required
      className="border rounded px-3 py-2"
    />
    <input
      type="number"
      name="price"
      value={data.price || 0}
      onChange={onChange}
      placeholder="Price"
      min="0"
      required
      className="border rounded px-3 py-2"
    />
    <button
      type="submit"
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      {submitLabel}
    </button>
  </form>
);

export default Dashboard;
