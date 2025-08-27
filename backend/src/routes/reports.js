const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket'); 
const Event = require('../models/Event'); 
const { protect, adminOrEmployee } = require('../middleware/authMiddleware');

// GET /api/reports - Sales & revenue per event
router.get('/', protect, adminOrEmployee, async (req, res) => {
  try {
    const reports = await Ticket.aggregate([
      {
        $group: {
          _id: '$event', 
          ticketsSold: { $sum: 1 },
          revenue: { $sum: '$amount' } 
        }
      }
    ]);

    const populatedReports = await Event.populate(reports, { path: '_id', select: 'name' });

    const formattedReports = populatedReports.map(r => ({
      eventId: r._id._id,
      eventName: r._id.name,
      ticketsSold: r.ticketsSold,
      revenue: r.revenue
    }));

    res.json(formattedReports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
