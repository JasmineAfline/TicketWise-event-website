const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Routes
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reportRoutes = require('./routes/reportRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');

const app = express();

// ========================
// Middleware
// ========================
app.use(cors());
app.use(express.json());

// ========================
// API Routes (API-only server)
// ========================
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Optional: simple health check
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'TicketWise API running' });
});

// ========================
// Connect to MongoDB & Start Server
// ========================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ticketwise';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
