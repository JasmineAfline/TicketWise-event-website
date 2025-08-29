const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');   // 👈 add this
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const reportsRoutes = require('./routes/reports');

dotenv.config();
connectDB();

const app = express();

// ✅ CORS middleware (must come before routes)
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// ✅ JSON parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/reports', reportsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
