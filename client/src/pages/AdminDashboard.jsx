import { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          name,
          price,
          description,
          countInStock,
          image,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Product added successfully ✅");

      // clear form
      setName("");
      setPrice("");
      setDescription("");
      setCountInStock("");
      setImage("");
      setCategory("");

    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
      setMessage("Product add failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Stock"
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Add Product</button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default Admin;