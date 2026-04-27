// backend/src/controllers/eventController.js
const Event = require("../models/Event");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, location, date, time, price } = req.body;
    const event = await Event.create({
      title, description, location, date, time, price,
      createdBy: req.user ? req.user._id : null,
    });
    res.status(201).json({ message: "Event created", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all events (public)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate({
      path: "createdBy",
      select: "name email role",
      strictPopulate: false,
    });
    res.status(200).json({ events }); // ← wrapped in { events } to match your frontend
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email role");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event updated", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (req.user.role !== "admin" && !event.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: "Forbidden: Not allowed" });
    }

    await Event.findByIdAndDelete(req.params.id); // ← fixed: .remove() is deprecated
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};