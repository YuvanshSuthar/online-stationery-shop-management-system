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

        if (type === "increase") {
          newQuantity += 1;
        } else if (type === "decrease" && newQuantity > 1) {
          newQuantity -= 1;
        }

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

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
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
      {
        items: orderItems,
        totalAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);
    localStorage.removeItem("cart");
    setCartItems([]);
  } catch (error) {
    alert(error.response?.data?.message || "Order failed");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart Page</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ₹{item.price * item.quantity}</p>

              <button onClick={() => updateQuantity(item._id, "increase")}>
                +
              </button>

              <button
                onClick={() => updateQuantity(item._id, "decrease")}
                style={{ marginLeft: "10px" }}
              >
                -
              </button>

              <button
                onClick={() => removeItem(item._id)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Grand Total: ₹{totalAmount}</h2>
          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;
