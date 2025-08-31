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

// Public – View All Events
router.get("/", getEvents);

// Public – View Single Event
router.get("/:id", getEventById);

// Employee/Admin – Create Event(s)
router.post("/", protect, authorizeRoles("employee", "admin"), createEvent);

// Employee/Admin – Update Event
router.put("/:id", protect, authorizeRoles("employee", "admin"), updateEvent);

// Admin Only – Delete Event
router.delete("/:id", protect, authorizeRoles("admin"), deleteEvent);

module.exports = router;
