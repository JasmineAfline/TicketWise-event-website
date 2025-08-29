const Event = require("../models/Event");

// @desc Create Event
// @route POST /api/events
// @access Employee/Admin
const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, price } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      price,
      createdBy: req.user.id, // from auth middleware
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

// @desc Get All Events
// @route GET /api/events
// @access Public
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email role").sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// @desc Update Event
// @route PUT /api/events/:id
// @access Employee/Admin
const updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Only creator or admin can update
    if (event.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this event" });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};

// @desc Delete Event
// @route DELETE /api/events/:id
// @access Admin only
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.deleteOne();
    res.json({ message: "Event removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };
