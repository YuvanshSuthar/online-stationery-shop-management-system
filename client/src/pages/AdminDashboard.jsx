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

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
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
      setMessage("Product added successfully ✅");

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
      setMessage(error.response?.data?.message || "Product add failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Add Product</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default AdminDashboard;