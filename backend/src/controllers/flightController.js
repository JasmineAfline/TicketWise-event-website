const Flight = require('../models/Flight');

// Create Flight
const createFlight = async (req, res) => {
  try {
    let flight = await Flight.create({ ...req.body, createdBy: req.user.id });
    flight = await flight.populate('createdBy', 'name email role');
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ message: 'Error creating flight', error: error.message });
  }
};

// Get all flights
const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find().populate('createdBy', 'name email role').sort({ departureTime: 1 });
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights', error: error.message });
  }
};

// Get flight by ID
const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id).populate('createdBy', 'name email role');
    if (!flight) return res.status(404).json({ message: 'Flight not found' });
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flight', error: error.message });
  }
};

// Update flight
const updateFlight = async (req, res) => {
  try {
    let flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });

    if (flight.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this flight' });
    }

    flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('createdBy', 'name email role');
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: 'Error updating flight', error: error.message });
  }
};

// Delete flight
const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });

    await flight.deleteOne();
    res.json({ message: 'Flight removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting flight', error: error.message });
  }
};

module.exports = { createFlight, getFlights, getFlightById, updateFlight, deleteFlight };
