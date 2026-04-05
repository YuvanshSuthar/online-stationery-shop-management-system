import { useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);

      setFormData({
        name: "",
        price: "",
        description: "",
        stock: "",
        image: "",
        category: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Product add failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={formData.name}
          onChange={handleChange}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
          }}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
          }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
          }}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
          }}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
          }}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
          }}
        />

        <button type="submit">Add Product</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminDashboard;