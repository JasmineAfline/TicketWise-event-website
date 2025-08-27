const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required']
  },
  description: {
    type: String,
    required: [true, 'Event description is required']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  location: {
    type: String,
    required: [true, 'Event location is required']
  },
  price: {
    type: Number,
    required: [true, 'Ticket price is required']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // The employee/admin who added it
    required: true
  }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
