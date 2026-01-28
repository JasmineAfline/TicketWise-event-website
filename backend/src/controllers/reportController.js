const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.getReports = async (req, res) => {
  try {
    // Total bookings
    const totalBookings = await Booking.countDocuments();

    // Total revenue (sum of paid bookings)
    const totalRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Popular events
    const popularEvents = await Booking.aggregate([
      { $group: { _id: '$event', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'events', localField: '_id', foreignField: '_id', as: 'event' } },
      { $unwind: '$event' }
    ]);

    res.status(200).json({
      totalBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
      popularEvents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
