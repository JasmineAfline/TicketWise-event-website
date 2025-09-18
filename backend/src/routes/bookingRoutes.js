// bookingRoutes.js
import express from "express";
import { createBooking, updatePaymentStatus, getUserBookings, getAllBookings } from "../controllers/bookingController.js";
import { protect, authorize } from "../middleware/authMiddleware.js"; // assuming JWT middleware

const router = express.Router();

// Create booking (logged-in users)
router.post("/", protect, createBooking);

// M-Pesa callback (no auth)
router.post("/mpesa/callback", updatePaymentStatus);

// Get bookings for logged-in user
router.get("/user", protect, getUserBookings);

// Get all bookings (Admin/Employee)
router.get("/", protect, authorize("admin", "employee"), getAllBookings);

export default router;
