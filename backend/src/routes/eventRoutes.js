const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// Protected
router.post("/", protect, authorize("admin", "employee"), createEvent);
router.put("/:id", protect, authorize("admin", "employee"), updateEvent);
router.delete("/:id", protect, authorize("admin", "employee"), deleteEvent);

module.exports = router;