import express from "express";
import Testimonial from "../models/Testimonial.js";

const router = express.Router();

// Get all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch testimonials." });
  }
});

// Add new testimonial
router.post("/", async (req, res) => {
  try {
    const { name, message, image } = req.body;
    const newTestimonial = new Testimonial({ name, message, image });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(400).json({ message: "Failed to create testimonial." });
  }
});

export default router;
