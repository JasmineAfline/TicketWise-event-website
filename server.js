require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');

  // Routes - only registered after DB connection
  app.use('/api/auth', authRoutes);

  // Start the server after DB connection is successful
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
