const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const Event = require("../models/Event");

// Public – View All Events
router.get("/", getEvents);

// Public – View Single Event
router.get("/:id", getEventById);

// Employee/Admin – Create Event
router.post("/", protect, authorizeRoles("employee", "admin"), createEvent);

// 🔹 Employee/Admin – Bulk Create Events (auto-attach createdBy)
router.post("/bulk", protect, authorizeRoles("employee", "admin"), async (req, res) => {
  try {
    const userId = req.user._id; // logged-in employee/admin

    const eventsWithCreator = req.body.events.map(event => ({
      ...event,
      createdBy: userId
    }));

    const savedEvents = await Event.insertMany(eventsWithCreator);
    res.json({ message: "Events added successfully", events: savedEvents });
  } catch (error) {
    res.status(500).json({ message: "Error inserting events", error: error.message });
  }
});

// Employee/Admin – Update Event
router.put("/:id", protect, authorizeRoles("employee", "admin"), updateEvent);

// Admin Only – Delete Event
router.delete("/:id", protect, authorizeRoles("admin"), deleteEvent);

module.exports = router;
