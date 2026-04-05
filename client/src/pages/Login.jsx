import { useState } from "react";
import axios from "axios";

const Login = () => {
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
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                formData
            );
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setMessage("Login successfully");

            setTimeout(() => {
                window.location.href = "/products";
            }, 1000);

            setFormData({ email: "", password: "" });
        } catch (error) {
            console.log("Login error:", error.response?.data || error.message);
            setMessage(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Login Page</h1>

            <form
                onSubmit={handleSubmit}
                style={{ maxWidth: "300px", margin: "20px auto" }}
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                        display: "block",
                        marginBottom: "10px",
                        width: "100%",
                        padding: "8px",
                    }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                        display: "block",
                        marginBottom: "10px",
                        width: "100%",
                        padding: "8px",
                    }}
                />

                <button type="submit">Login</button>
            </form>

            {message && (
                <p style={{ marginTop: "10px", fontWeight: "bold" }}>{message}</p>
            )}
        </div>
    );
};

export default Login;