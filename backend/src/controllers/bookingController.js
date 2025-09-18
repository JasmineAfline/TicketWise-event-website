import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import MpesaService from "../utils/mpesaService.js";

// ==========================
// Create Booking
// ==========================
export const createBooking = async (req, res) => {
  try {
    const { eventId, phoneNumber } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if user already booked
    const existingBooking = await Booking.findOne({
      user: req.user._id,
      event: eventId,
    });
    if (existingBooking) return res.status(400).json({ message: "Already booked" });

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      event: eventId,
      amount: event.price,
      paymentStatus: event.price === 0 ? "paid" : "pending",
      paymentDate: event.price === 0 ? new Date() : null,
    });

    // Free event: add user to attendees
    if (event.price === 0) {
      event.attendees.push(req.user._id);
      await event.save();
      return res.status(201).json({ message: "Booking confirmed (free event)", booking });
    }

    // Paid event: trigger M-Pesa STK Push (sandbox hardcoded)
    const stkResponse = await MpesaService.stkPush(
      phoneNumber,
      event.price,
      `Event-${event._id}`
    );

    booking.mpesaCheckoutRequestID = stkResponse.CheckoutRequestID;
    await booking.save();

    res.status(201).json({
      message: "Booking created. Complete payment via M-Pesa STK Push.",
      booking,
      stkResponse,
    });
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ message: "Booking failed" });
  }
};

// ==========================
// M-Pesa callback to update payment
// ==========================
export const updatePaymentStatus = async (req, res) => {
  try {
    const { CheckoutRequestID, ResultCode, ResultDesc } = req.body.Body.stkCallback;

    const booking = await Booking.findOne({ mpesaCheckoutRequestID: CheckoutRequestID });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (ResultCode === 0) {
      booking.paymentStatus = "paid";
      booking.paymentDate = new Date();
      await booking.save();

      // Add user to event attendees
      const event = await Event.findById(booking.event);
      event.attendees.push(booking.user);
      await event.save();
    } else {
      booking.paymentStatus = "failed";
      await booking.save();
    }

    res.status(200).json({ message: "Payment status updated", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update payment status" });
  }
};

// ==========================
// Get bookings for logged-in user
// ==========================
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("event", "title date location price");
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Get all bookings (Admin/Employee)
// ==========================
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("event", "title date location price");
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
