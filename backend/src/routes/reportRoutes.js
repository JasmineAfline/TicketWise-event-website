import express from "express";
import { getReports } from "../controllers/reportController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only reports route
router.get("/", protect, authorize("admin"), getReports);

export default router;
