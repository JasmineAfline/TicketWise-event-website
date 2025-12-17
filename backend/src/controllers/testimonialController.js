import Testimonial from '../models/Testimonial.js'; // We'll create this model next

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, message, image } = req.body;
    const testimonial = await Testimonial.create({ name, message, image });
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
