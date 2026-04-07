import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../config/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(getApiUrl("/api/orders/my-orders"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log("Fetch orders error", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const removeMyOrder = async (orderId) => {
    const ok = window.confirm("Remove this order?");
    if (!ok) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(getApiUrl(`/api/orders/my-orders/${orderId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || "Order removed");
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Remove order failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <button
              onClick={() => removeMyOrder(order._id)}
              style={{
                padding: "8px 12px",
                border: "none",
                borderRadius: "6px",
                background: "#ef4444",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Remove Order
            </button>

            <h4>Items:</h4>
            {order.items.map((item, index) => (
              <div key={index}>
                <p>{item.name} - ₹{item.price} x {item.quantity}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
