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
    <section className="page">
      <div className="page-head">
        <h1>Products</h1>
      </div>

      <div className="toolbar glass-card">
        <input
          className="input"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="input"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="glass-card empty-state">No products found</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((item) => (
            <article key={item._id} className="glass-card product-card">
              <img
                src={item.image || DEFAULT_PRODUCT_IMAGE}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                }}
                className="product-image"
              />

              <h3>{item.name}</h3>
              <p className="price">Rs.{item.price}</p>
              <p className="muted">{item.description}</p>
              <p className="muted">Stock: {item.stock}</p>
              <p className="muted">Category: {item.category}</p>

              {isAdmin && editingId !== item._id && (
                <button className="btn btn-secondary" onClick={() => startEdit(item)}>
                  Edit Product
                </button>
              )}

              {isAdmin && editingId === item._id && (
                <div className="editor-box">
                  <input className="input" type="text" name="name" placeholder="Name" value={editForm.name} onChange={handleEditChange} />
                  <input className="input" type="number" name="price" placeholder="Price" value={editForm.price} onChange={handleEditChange} />
                  <textarea className="input" name="description" placeholder="Description" value={editForm.description} onChange={handleEditChange} />
                  <input className="input" type="number" name="stock" placeholder="Stock" value={editForm.stock} onChange={handleEditChange} />
                  <input className="input" type="text" name="image" placeholder="Image URL" value={editForm.image} onChange={handleEditChange} />
                  <input className="input" type="text" name="category" placeholder="Category" value={editForm.category} onChange={handleEditChange} />
                  <button className="btn btn-primary" onClick={() => saveEdit(item._id)}>Save</button>
                  <button className="btn btn-danger" onClick={cancelEdit}>Cancel</button>
                </div>
              )}

              <button className="btn btn-primary" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
