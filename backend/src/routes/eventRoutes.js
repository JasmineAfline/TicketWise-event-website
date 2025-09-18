// src/routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// ==========================
// Public / unprotected routes
// ==========================

// Get all events
router.get("/", eventController.getAllEvents);

// Get single event by ID
router.get("/:id", eventController.getEventById);

// Create event (unprotected for testing)
router.post("/", eventController.createEvent);

// Delete event (unprotected for testing)
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
