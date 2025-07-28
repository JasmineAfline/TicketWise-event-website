const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// ✅ Routes
const authRoutes = require('./routes/authRoutes'); 
const protectedRoutes = require('./routes/protectedRoutes');

// ✅ Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// ✅ Default Route
app.get('/', (req, res) => {
  res.send('Welcome to TicketWise API 🎟️');
});

// ✅ Connect DB & Start Server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.log(err));
