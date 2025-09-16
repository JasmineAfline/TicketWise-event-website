import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import Checkout from "./pages/Checkout";

// Event-related Pages (directly in src/)
import AddEvent from "./AddEvent";
import ManageEvents from "./ManageEvents";
import ViewEvents from "./ViewEvents";
import BookEvent from "./BookEvent";

// Unified Dashboard (directly in src/)
import Dashboard from "./pages/dashboards/Dashboard";

// Layout wrapper for pages with Navbar + Footer
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Layout><LandingPage /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/events" element={<Layout><Events /></Layout>} />
      <Route path="/events/:id" element={<Layout><EventDetails /></Layout>} />
      <Route path="/create" element={<Layout><CreateEvent /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />

      {/* Booking & Checkout */}
      <Route path="/book/:id" element={<Layout><BookEvent /></Layout>} />
      <Route path="/checkout/:id" element={<Layout><Checkout /></Layout>} />

      {/* Auth */}
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Unified Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin", "employee", "user"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Event Pages */}
      <Route
        path="/admin/add-event"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-events"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/view-events"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <ViewEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/book-event"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <BookEvent />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
