const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// @desc Sales per event
// @route GET /api/reports/sales
// @access Admin only
router.get('/sales', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const reports = await Ticket.aggregate([
      {
        $group: {
          _id: '$event',
          ticketsSold: { $sum: 1 },
          revenue: { $sum: '$price' }
        }
      }
    ]);

    const populatedReports = await Event.populate(reports, { path: '_id', select: 'title' });

    const formattedReports = populatedReports.map(r => ({
      eventId: r._id._id,
      eventName: r._id.title,
      ticketsSold: r.ticketsSold,
      revenue: r.revenue
    }));

    res.json(formattedReports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc Attendance per event
// @route GET /api/reports/attendance
// @access Admin/Employee
router.get('/attendance', protect, authorizeRoles('admin', 'employee'), async (req, res) => {
  try {
    const reports = await Ticket.aggregate([
      {
        $group: {
          _id: '$event',
          attendees: { $sum: 1 }
        }
      }
    ]);

    const populatedReports = await Event.populate(reports, { path: '_id', select: 'title' });

    const formattedReports = populatedReports.map(r => ({
      eventId: r._id._id,
      eventName: r._id.title,
      attendees: r.attendees
    }));

    res.json(formattedReports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
