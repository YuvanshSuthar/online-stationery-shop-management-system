import { useState } from "react";
import axios from "axios";
import { getApiUrl } from "../config/api";

const DEFAULT_PRODUCT_IMAGE =
  "https://dummyimage.com/600x400/1f2937/ffffff&text=No+Image";

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

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setMessage("Image uploaded successfully. You can now add product.");
    };
    reader.readAsDataURL(file);
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
      await axios.post(
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
    <section className="page admin-page">
      <div className="page-head">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="glass-card admin-form-card">
        <h2>Add Product</h2>

        {!isAdmin && <p className="status-text error">Admin login is required.</p>}

        <form onSubmit={handleSubmit} className="form-grid">
          <input className="input" type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
          <input className="input" type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <textarea className="input" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input className="input" type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
          <input className="input" type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
          <input className="input file-input" type="file" accept="image/*" onChange={handleImageUpload} />

          <img
            src={formData.image || DEFAULT_PRODUCT_IMAGE}
            alt="Product preview"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
            }}
            className="preview-image"
          />

          <input className="input" type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
          <button className="btn btn-primary" type="submit">Add Product</button>
        </form>

        {message && <p className="status-text">{message}</p>}
      </div>
    </section>
  );
};

export default AdminDashboard;
