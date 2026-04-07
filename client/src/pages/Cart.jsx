import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../config/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, type) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === id) {
        let newQuantity = item.quantity;

        if (type === "increase") newQuantity += 1;
        if (type === "decrease" && newQuantity > 1) newQuantity -= 1;

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const orderItems = cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const res = await axios.post(
        getApiUrl("/api/orders"),
        { items: orderItems, totalAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message);
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <section className="page">
      <div className="page-head">
        <h1>Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="glass-card empty-state">Your cart is empty</div>
      ) : (
        <div className="stack-gap">
          {cartItems.map((item) => (
            <article key={item._id} className="glass-card order-card">
              <h3>{item.name}</h3>
              <p className="muted">Price: Rs.{item.price}</p>
              <p className="muted">Quantity: {item.quantity}</p>
              <p className="muted">Total: Rs.{item.price * item.quantity}</p>

              <div className="row-actions">
                <button className="btn btn-secondary" onClick={() => updateQuantity(item._id, "increase")}>+</button>
                <button className="btn btn-secondary" onClick={() => updateQuantity(item._id, "decrease")}>-</button>
                <button className="btn btn-danger" onClick={() => removeItem(item._id)}>Remove</button>
              </div>
            </article>
          ))}

          <div className="glass-card total-bar">
            <h2>Grand Total: Rs.{totalAmount}</h2>
            <button className="btn btn-primary" onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
