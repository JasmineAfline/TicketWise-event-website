import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Ticket,
  User,
  TrendingUp,
  MapPin,
  DollarSign,
  Users,
  FileText,
  LogOut,
  Settings,
  Bell,
  Search,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Axios instance with dynamic token
const axiosInstance = axios.create({
  baseURL: "https://ticketwise-backend.onrender.com/api",
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, activeTab]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      if (activeTab === "overview") {
        await fetchStats();
      } else if (activeTab === "bookings") {
        await fetchBookings();
      } else if (activeTab === "events") {
        await fetchEvents();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const bookingsRes = await axiosInstance.get(
        user.role === "user" ? "/bookings/my" : "/bookings"
      );
      const eventsRes = await axiosInstance.get("/events");

      const bookings = bookingsRes.data.bookings || bookingsRes.data || [];
      const events = eventsRes.data.events || eventsRes.data || [];

      setStats({
        totalBookings: bookings.length,
        upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length,
        totalSpent: bookings.reduce((sum, b) => sum + (b.event?.price || 0), 0),
        activeEvents: events.length,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get(
        user.role === "user" ? "/bookings/my" : "/bookings"
      );
      setData(res.data.bookings || res.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setData([]);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get("/events");
      setData(res.data.events || res.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      setData([]);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filteredData = data.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    if (activeTab === "bookings") {
      return (
        item.event?.title?.toLowerCase().includes(searchLower) ||
        item.status?.toLowerCase().includes(searchLower)
      );
    } else if (activeTab === "events") {
      return (
        item.title?.toLowerCase().includes(searchLower) ||
        item.location?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {user?.role === "admin" ? "Administrator Dashboard" : 
                 user?.role === "employee" ? "Employee Dashboard" : 
                 "User Dashboard"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => navigate("/profile")}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Settings size={20} className="text-gray-600" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex gap-2 overflow-x-auto">
          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={<TrendingUp size={18} />}
            label="Overview"
          />
          <TabButton
            active={activeTab === "bookings"}
            onClick={() => setActiveTab("bookings")}
            icon={<Ticket size={18} />}
            label="My Bookings"
          />
          <TabButton
            active={activeTab === "events"}
            onClick={() => setActiveTab("events")}
            icon={<Calendar size={18} />}
            label="Browse Events"
          />
          {user?.role === "admin" && (
            <>
              <TabButton
                active={activeTab === "users"}
                onClick={() => setActiveTab("users")}
                icon={<Users size={18} />}
                label="Manage Users"
              />
              <TabButton
                active={activeTab === "reports"}
                onClick={() => setActiveTab("reports")}
                icon={<FileText size={18} />}
                label="Reports"
              />
            </>
          )}
        </div>

        {/* Content Area */}
        {activeTab === "overview" && (
          <OverviewSection stats={stats} user={user} navigate={navigate} />
        )}

        {activeTab === "bookings" && (
          <BookingsSection
            bookings={filteredData}
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            user={user}
          />
        )}

        {activeTab === "events" && (
          <EventsSection
            events={filteredData}
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            navigate={navigate}
          />
        )}

        {activeTab === "users" && user?.role === "admin" && (
          <UsersSection />
        )}

        {activeTab === "reports" && user?.role === "admin" && (
          <ReportsSection />
        )}
      </div>
    </div>
  );
};

// Tab Button Component
const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
      active
        ? "bg-blue-500 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className="whitespace-nowrap">{label}</span>
  </button>
);

// Overview Section
const OverviewSection = ({ stats, user, navigate }) => (
  <div className="space-y-6 animate-fade-in">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        icon={<Ticket className="text-blue-500" size={24} />}
        title="Total Bookings"
        value={stats.totalBookings || 0}
        bgColor="bg-blue-50"
      />
      <StatsCard
        icon={<Calendar className="text-green-500" size={24} />}
        title="Upcoming Events"
        value={stats.upcomingEvents || 0}
        bgColor="bg-green-50"
      />
      <StatsCard
        icon={<DollarSign className="text-purple-500" size={24} />}
        title="Total Spent"
        value={`KSh ${stats.totalSpent || 0}`}
        bgColor="bg-purple-50"
      />
      <StatsCard
        icon={<TrendingUp className="text-orange-500" size={24} />}
        title="Active Events"
        value={stats.activeEvents || 0}
        bgColor="bg-orange-50"
      />
    </div>

    {/* Quick Actions */}
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActionCard
          icon={<Calendar size={20} />}
          title="Browse Events"
          description="Discover upcoming events"
          onClick={() => navigate("/events")}
          color="blue"
        />
        <ActionCard
          icon={<Ticket size={20} />}
          title="My Tickets"
          description="View your bookings"
          onClick={() => navigate("/dashboard")}
          color="green"
        />
        <ActionCard
          icon={<User size={20} />}
          title="Profile Settings"
          description="Update your information"
          onClick={() => navigate("/profile")}
          color="purple"
        />
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-3">
        <ActivityItem
          icon={<CheckCircle className="text-green-500" size={20} />}
          title="Booking Confirmed"
          description="Your ticket for Music Festival has been confirmed"
          time="2 hours ago"
        />
        <ActivityItem
          icon={<Calendar className="text-blue-500" size={20} />}
          title="New Event Available"
          description="Tech Conference 2024 is now open for booking"
          time="1 day ago"
        />
        <ActivityItem
          icon={<AlertCircle className="text-orange-500" size={20} />}
          title="Event Reminder"
          description="Food Carnival starts in 3 days"
          time="2 days ago"
        />
      </div>
    </div>
  </div>
);

// Bookings Section
const BookingsSection = ({ bookings, loading, searchTerm, setSearchTerm, user }) => (
  <div className="space-y-6 animate-fade-in">
    {/* Search Bar */}
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    {/* Bookings List */}
    <div className="grid grid-cols-1 gap-4">
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Ticket className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
          <p className="text-gray-600 mb-6">Start exploring events and book your first ticket!</p>
          <button
            onClick={() => window.location.href = "/events"}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Events
          </button>
        </div>
      ) : (
        bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))
      )}
    </div>
  </div>
);

// Events Section
const EventsSection = ({ events, loading, searchTerm, setSearchTerm, navigate }) => (
  <div className="space-y-6 animate-fade-in">
    {/* Search Bar */}
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    {/* Events Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        <div className="col-span-full text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="col-span-full bg-white rounded-xl shadow-sm p-12 text-center">
          <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Check back later for new events!</p>
        </div>
      ) : (
        events.map((event) => (
          <EventCard key={event._id} event={event} navigate={navigate} />
        ))
      )}
    </div>
  </div>
);

// Stats Card Component
const StatsCard = ({ icon, title, value, bgColor }) => (
  <div className={`${bgColor} rounded-xl p-6 transform hover:scale-105 transition-transform`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="p-3 bg-white rounded-lg shadow-sm">{icon}</div>
    </div>
  </div>
);

// Action Card Component
const ActionCard = ({ icon, title, description, onClick, color }) => {
  const colors = {
    blue: "bg-blue-50 hover:bg-blue-100 text-blue-600",
    green: "bg-green-50 hover:bg-green-100 text-green-600",
    purple: "bg-purple-50 hover:bg-purple-100 text-purple-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} p-4 rounded-lg text-left transition-all transform hover:scale-105`}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm opacity-80">{description}</p>
    </button>
  );
};

// Activity Item Component
const ActivityItem = ({ icon, title, description, time }) => (
  <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="mt-1">{icon}</div>
    <div className="flex-1">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-xs text-gray-400 mt-1">{time}</p>
    </div>
  </div>
);

// Booking Card Component
const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {booking.event?.title || "Event"}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {booking.event?.date ? new Date(booking.event.date).toLocaleDateString() : "N/A"}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              {booking.event?.location || "N/A"}
            </span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
          {booking.status || "Pending"}
        </span>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-lg font-bold text-gray-900">
          KSh {booking.event?.price || 0}
        </span>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
          View Details
        </button>
      </div>
    </div>
  );
};

// Event Card Component
const EventCard = ({ event, navigate }) => {
  const isUpcoming = new Date(event.date) > new Date();

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
        <Calendar className="text-white" size={64} />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign size={16} />
            <span className="font-semibold">KSh {event.price}</span>
          </div>
        </div>
        <button
          onClick={() => navigate(`/events/${event._id}`)}
          className={`w-full py-2 rounded-lg font-medium transition-colors ${
            isUpcoming
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!isUpcoming}
        >
          {isUpcoming ? "Book Now" : "Event Passed"}
        </button>
      </div>
    </div>
  );
};

// Users Section (Admin only)
const UsersSection = () => (
  <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in">
    <h2 className="text-xl font-bold text-gray-900 mb-4">User Management</h2>
    <p className="text-gray-600">Admin user management features coming soon...</p>
  </div>
);

// Reports Section (Admin only)
const ReportsSection = () => (
  <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Reports & Analytics</h2>
    <p className="text-gray-600">Detailed reports and analytics coming soon...</p>
  </div>
);

export default Dashboard;

