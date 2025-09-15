const Event = require("../models/Event");

// @desc Create Event(s)
// @route POST /api/events
// @access Employee/Admin
const createEvent = async (req, res) => {
  try {
    const data = req.body;

    //  Check if multiple events (array)
    if (Array.isArray(data)) {
      // Add createdBy for each event
      const eventsWithUser = data.map((ev) => ({
        ...ev,
        createdBy: req.user.id,
      }));

      const events = await Event.insertMany(eventsWithUser);
      return res.status(201).json(events);
    }

    //  Single event
    let event = await Event.create({
      ...data,
      createdBy: req.user.id, // from auth middleware
    });

    event = await event.populate("createdBy", "name email role");
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
    const events = await Event.find()
      .populate("createdBy", "name email role")
      .sort({ date: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// @desc Get Single Event by ID
// @route GET /api/events/:id
// @access Public
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "name email role");

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
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

    event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("createdBy", "name email role");

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

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
