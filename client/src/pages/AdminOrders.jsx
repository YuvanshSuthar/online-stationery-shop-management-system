import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../config/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(getApiUrl("/api/orders"), {
        headers: { Authorization: `Bearer ${token}` },
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
        getApiUrl(`/api/orders/${orderId}/status`),
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      fetchAllOrders();
    } catch (error) {
      console.log("Update status error", error);
    }
  };

  const removeOrder = async (orderId) => {
    const ok = window.confirm("Remove this order?");
    if (!ok) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(getApiUrl(`/api/orders/${orderId}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message || "Order removed");
      fetchAllOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Remove order failed");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <section className="page">
      <div className="page-head">
        <h1>Admin Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="glass-card empty-state">No orders found</div>
      ) : (
        <div className="stack-gap">
          {orders.map((order) => (
            <article key={order._id} className="glass-card order-card">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>User:</strong> {order.user?.name}</p>
              <p><strong>Email:</strong> {order.user?.email}</p>
              <p><strong>Total:</strong> Rs.{order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>

              <div className="row-actions">
                <select
                  className="input status-select"
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>

                <button className="btn btn-danger" onClick={() => removeOrder(order._id)}>
                  Remove Order
                </button>
              </div>

              <h4>Items:</h4>
              <div className="items-list">
                {order.items.map((item, index) => (
                  <p key={index}>{item.name} - Rs.{item.price} x {item.quantity}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminOrders;
