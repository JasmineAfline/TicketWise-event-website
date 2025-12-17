import express from "express";
import { getTestimonials, createTestimonial } from "../controllers/testimonialController.js";

const router = express.Router();

// Get all testimonials
router.get("/", getTestimonials);

// Create a new testimonial
router.post("/", createTestimonial);

export default router;
