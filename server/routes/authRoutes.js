import express from "express";
import {
  registerUser,
  loginUser,
  getLoginActivities,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/login-activities", protect, adminOnly, getLoginActivities);

export default router;
