import express from "express";
import {
  registerUser,
  loginUser,
  requestLoginOtp,
  verifyLoginOtp,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/login/request-otp", requestLoginOtp);
router.post("/login/verify-otp", verifyLoginOtp);

export default router;
