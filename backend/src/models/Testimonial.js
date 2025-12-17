import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String }, // optional
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
