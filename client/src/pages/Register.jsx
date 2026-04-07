import { useState } from "react";
import axios from "axios";
import { getApiUrl } from "../config/api";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(getApiUrl("/api/auth/register"), formData);
      setMessage(res.data.message || "Register successful");
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <section className="page auth-page">
      <div className="auth-card glass-card">
        <h1>Create Account</h1>
        <p className="muted">Join now and start managing your stationery purchases.</p>

        <form onSubmit={handleSubmit} className="form-stack">
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <button className="btn btn-primary" type="submit">Register</button>
        </form>

        {message && <p className="status-text">{message}</p>}
      </div>
    </section>
  );
};

export default Register;
