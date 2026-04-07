import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../config/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(getApiUrl("/api/orders/my-orders"), {
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message || "Order removed");
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Remove order failed");
    }
  };

  return (
    <section className="page">
      <div className="page-head">
        <h1>My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="glass-card empty-state">No orders found</div>
      ) : (
        <div className="stack-gap">
          {orders.map((order) => (
            <article key={order._id} className="glass-card order-card">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> Rs.{order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>

              <button className="btn btn-danger" onClick={() => removeMyOrder(order._id)}>
                Remove Order
              </button>

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

export default MyOrders;
