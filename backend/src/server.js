import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";


dotenv.config();

const app = express();

// ========================
// ES module dirname fix
// ========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================
// Middleware
// ========================
app.use(cors());
app.use(express.json());

// ========================
// Serve Tailwind frontend files
// ========================
app.use(express.static(path.join(__dirname, "..", "public")));


// ========================
// API Routes
// ========================
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/testimonials", testimonialRoutes);


// ========================
// Default route (loads homepage)
// ========================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));

});

// ========================
// Connect to MongoDB & Start Server
// ========================
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ticketwise";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
