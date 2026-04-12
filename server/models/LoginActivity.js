import mongoose from "mongoose";

const loginActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      required: true,
    },
    ipAddress: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
    },
    loggedInAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const LoginActivity = mongoose.model("LoginActivity", loginActivitySchema);

export default LoginActivity;
