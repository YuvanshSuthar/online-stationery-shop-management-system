import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../config/api";

const DEFAULT_PRODUCT_IMAGE =
  "https://dummyimage.com/600x400/1f2937/ffffff&text=No+Image";

const Products = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = user?.role === "admin";

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    image: "",
    category: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(getApiUrl("/api/products"));
      setProducts(res.data);
    } catch (error) {
      console.log("Product fetch error", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((item) => item.category).filter(Boolean)),
  ];

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      cart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name || "",
      price: product.price ?? "",
      description: product.description || "",
      stock: product.stock ?? "",
      image: product.image || "",
      category: product.category || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      price: "",
      description: "",
      stock: "",
      image: "",
      category: "",
    });
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveEdit = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login as admin");
        return;
      }

      await axios.put(
        getApiUrl(`/api/products/${productId}`),
        {
          name: editForm.name,
          price: Number(editForm.price),
          description: editForm.description,
          stock: Number(editForm.stock),
          image: editForm.image,
          category: editForm.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product updated successfully");
      cancelEdit();
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Product update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Products</h1>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "10px",
            width: "200px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No products found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              style={{
                background: "#1f2937",
                color: "white",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={item.image || DEFAULT_PRODUCT_IMAGE}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                }}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />

              <h3>{item.name}</h3>
              <p>Price: Rs.{item.price}</p>
              <p>{item.description}</p>
              <p>Stock: {item.stock}</p>
              <p>Category: {item.category}</p>

              {isAdmin && editingId !== item._id && (
                <button
                  onClick={() => startEdit(item)}
                  style={{
                    marginTop: "8px",
                    padding: "8px",
                    width: "100%",
                    border: "none",
                    borderRadius: "6px",
                    background: "#3b82f6",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Edit Product
                </button>
              )}

              {isAdmin && editingId === item._id && (
                <div style={{ marginTop: "10px" }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    style={{ width: "100%", marginBottom: "6px", padding: "8px" }}
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    style={{ width: "100%", marginBottom: "6px", padding: "8px" }}
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    style={{ width: "100%", marginBottom: "6px", padding: "8px" }}
                  />
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={editForm.stock}
                    onChange={handleEditChange}
                    style={{ width: "100%", marginBottom: "6px", padding: "8px" }}
                  />
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={editForm.image}
                    onChange={handleEditChange}
                    style={{ width: "100%", marginBottom: "6px", padding: "8px" }}
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    style={{ width: "100%", marginBottom: "6px", padding: "8px" }}
                  />
                  <button
                    onClick={() => saveEdit(item._id)}
                    style={{
                      marginTop: "6px",
                      padding: "8px",
                      width: "100%",
                      border: "none",
                      borderRadius: "6px",
                      background: "#22c55e",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    style={{
                      marginTop: "6px",
                      padding: "8px",
                      width: "100%",
                      border: "none",
                      borderRadius: "6px",
                      background: "#ef4444",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}

              <button
                onClick={() => addToCart(item)}
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  width: "100%",
                  border: "none",
                  borderRadius: "6px",
                  background: "#22c55e",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
