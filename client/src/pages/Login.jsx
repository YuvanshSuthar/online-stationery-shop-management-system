import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../config/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const requestOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(getApiUrl("/api/auth/login/request-otp"), { email });
      setOtpSent(true);
      setMessage(res.data.message || "OTP sent to your email");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(getApiUrl("/api/auth/login/verify-otp"), {
        email,
        otp,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login successful");

      setTimeout(() => {
        navigate("/products");
      }, 600);
    } catch (error) {
      setMessage(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <section className="page auth-page">
      <div className="auth-card glass-card">
        <h1>Login With OTP</h1>
        <p className="muted">Enter your email and verify OTP sent to your inbox.</p>

        {!otpSent ? (
          <form onSubmit={requestOtp} className="form-stack">
            <input
              className="input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn-primary" type="submit">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="form-stack">
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button className="btn btn-primary" type="submit">
              Verify OTP
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={requestOtp}
            >
              Resend OTP
            </button>
          </form>
        )}

        {message && <p className="status-text">{message}</p>}
      </div>
    </section>
  );
};

export default Login;
