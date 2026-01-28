const express = require('express');
const { getTestimonials, createTestimonial } = require('../controllers/testimonialController');

const router = express.Router();

// Get all testimonials
router.get('/', getTestimonials);

// Create a new testimonial
router.post('/', createTestimonial);

module.exports = router;
