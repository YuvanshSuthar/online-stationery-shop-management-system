import { useState } from "react";
import axios from "axios";
import { getApiUrl } from "../config/api";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = user?.role === "admin";

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    image: "",
    category: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      setMessage("Admin access only. Please login with an admin account.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Token not found. Please login again.");
      return;
    }

    try {
      const res = await axios.post(
        getApiUrl("/api/products"),
        {
          name: formData.name,
          price: Number(formData.price),
          description: formData.description,
          stock: Number(formData.stock),
          image: formData.image,
          category: formData.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("SUCCESS:", res.data);
      setMessage("Product added successfully");

      setFormData({
        name: "",
        price: "",
        description: "",
        stock: "",
        image: "",
        category: "",
      });
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);

      const serverError = error.response?.data?.error;
      const serverMessage = error.response?.data?.message;

      setMessage(
        serverError
          ? `${serverMessage}: ${serverError}`
          : serverMessage || "Product add failed"
      );
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <h2>Add Product</h2>

      {!isAdmin && (
        <p style={{ color: "#ff6b6b" }}>
          You are logged in as customer. Admin login is required to add products.
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <button type="submit">Add Product</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default AdminDashboard;