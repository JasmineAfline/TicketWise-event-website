// backend/controllers/reportController.js
const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const User = require("../models/User");

// @desc Generate sales report (admin/employee)
// @route GET /api/reports
// @access Admin/Employee
const generateReport = async (req, res) => {
  try {
    let tickets;
    if (req.user.role === "admin") {
      // Admin sees all tickets
      tickets = await Ticket.find().populate("event user");
    } else {
      // Employee sees tickets for events they created
      const myEvents = await Event.find({ createdBy: req.user.id });
      const eventIds = myEvents.map((e) => e._id);
      tickets = await Ticket.find({ event: { $in: eventIds } }).populate("event user");
    }

    // Summarize total sales per event
    const summary = tickets.reduce((acc, ticket) => {
      const eventTitle = ticket.event.title;
      if (!acc[eventTitle]) acc[eventTitle] = { ticketsSold: 0, revenue: 0 };
      if (ticket.status === "paid") {
        acc[eventTitle].ticketsSold += 1;
        acc[eventTitle].revenue += ticket.price;
      }
      return acc;
    }, {});

    res.json({ summary, tickets });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate report", error: err.message });
  }
};

module.exports = { generateReport };
