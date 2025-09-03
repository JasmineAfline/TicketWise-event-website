const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const reportsRoutes = require('./routes/reports');
const flightRoutes = require('./routes/flightRoutes');
const paymentRoutes = require("./routes/paymentRoutes");



dotenv.config();
connectDB();

const app = express();

// CORS middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// JSON parser
app.use(express.json({ strict: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/flights', flightRoutes);
app.use("/api/payments", paymentRoutes);


console.log("Shortcode:", process.env.MPESA_SHORTCODE);
console.log("Passkey exists:", !!process.env.MPESA_PASSKEY);
console.log("Callback URL:", process.env.MPESA_CALLBACK_URL);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
