import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../config/api";

const Login = ({ onAuthChange, adminOnly = false }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(getApiUrl("/api/auth/login"), formData);

      if (adminOnly && res.data.user?.role !== "admin") {
        setMessage("Only admin account can login from this page.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onAuthChange?.();

      setMessage("Login successful");

      setTimeout(() => {
        navigate(adminOnly ? "/admin" : "/home");
      }, 600);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="page auth-page auth-entry-page">
      <div className="auth-card glass-card">
        <h1>{adminOnly ? "Admin Login" : "Welcome Back"}</h1>
        <p className="muted">
          {adminOnly
            ? "Login with admin account credentials."
            : "Login with your email and password."}
        </p>

        <form onSubmit={handleSubmit} className="form-stack">
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary" type="submit">Login</button>
        </form>

        {message && <p className="status-text">{message}</p>}
        {!adminOnly && (
          <p className="switch-link">
            Admin?
            {" "}
            <Link to="/admin-login">Login here</Link>
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;
