import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log("Fetch all orders error", error);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      fetchAllOrders();
    } catch (error) {
      console.log("Update status error", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              background: "#111827",
              color: "white",
            }}
          >
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>User:</strong> {order.user?.name}</p>
            <p><strong>Email:</strong> {order.user?.email}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>

            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              style={{ padding: "8px", marginTop: "10px", marginBottom: "10px" }}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>

            <h4>Items:</h4>
            {order.items.map((item, index) => (
              <p key={index}>
                {item.name} - ₹{item.price} x {item.quantity}
              </p>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;