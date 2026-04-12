import User from "../models/User.js";
import LoginActivity from "../models/LoginActivity.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "customer",
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Register error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const forwardedIp = req.headers["x-forwarded-for"];
    const ipAddress = Array.isArray(forwardedIp)
      ? forwardedIp[0]
      : (forwardedIp || req.socket?.remoteAddress || "").toString();

    try {
      await LoginActivity.create({
        user: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ipAddress,
        userAgent: req.headers["user-agent"] || "",
        loggedInAt: new Date(),
      });
    } catch (activityError) {
      console.log("LOGIN ACTIVITY ERROR:", activityError.message);
    }

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Login error" });
  }
};

export const getLoginActivities = async (req, res) => {
  try {
    const activities = await LoginActivity.find()
      .sort({ loggedInAt: -1 })
      .limit(200);

    return res.status(200).json(activities);
  } catch (error) {
    console.log("GET LOGIN ACTIVITIES ERROR:", error);
    return res.status(500).json({ message: "Could not fetch login activities" });
  }
};
