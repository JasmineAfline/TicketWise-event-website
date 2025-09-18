const Event = require("../models/Event");

// ==========================
// Create Event (Admin/Employee)
// ==========================
exports.createEvent = async (req, res) => {
  try {
    const { title, description, location, date, time, price } = req.body;

    const event = await Event.create({
      title,
      description,
      location,
      date,
      time,
      price,
     createdBy: req.user ? req.user._id : null, // from protect middleware
    });

    res.status(201).json({ message: "Event created", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Get all events (public)
// ==// Get all events (public)
exports.getAllEvents = async (req, res) => {
  try {
    // Populate createdBy only if it exists
    const events = await Event.find().populate({
      path: "createdBy",
      select: "name email role",
      strictPopulate: false, // prevents errors if createdBy is null
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Get single event by ID
// ==========================
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Delete Event (Admin/Employee who created it)
// ==========================
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Only admin or creator can delete
    if (req.user.role !== "admin" && !event.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: "Forbidden: Not allowed" });
    }

    await event.remove();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
