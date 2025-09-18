import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

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
import BookEvent from "./pages/BookEvent";

// Unified Dashboard
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
  const { user } = useAuth();

  // Role-based redirect after login
  const getDashboardRedirect = () => {
    if (!user) return "/login";
    return "/dashboard"; // Unified Dashboard handles role internally
  };

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
      <Route
        path="/login"
        element={user ? <Navigate to={getDashboardRedirect()} replace /> : <Layout><Login /></Layout>}
      />
      <Route
        path="/register"
        element={user ? <Navigate to={getDashboardRedirect()} replace /> : <Layout><Register /></Layout>}
      />
      <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />

      {/* Protected Unified Dashboard */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <ProtectedRoute allowedRoles={["admin", "employee", "user"]}>
              <Dashboard />
            </ProtectedRoute>
          </Layout>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
