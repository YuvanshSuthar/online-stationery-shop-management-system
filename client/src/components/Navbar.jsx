import { Link } from "react-router-dom";


const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const Navbar = () => {
  const linkStyle = {
    color: "white",
    marginRight: "20px",
    textDecoration: "none",
    fontSize: "18px",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    alert("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        padding: "15px",
        background: "#222",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left side links */}
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/products" style={linkStyle}>Products</Link>
        <Link to="/cart" style={linkStyle}>Cart</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
        <Link to="/admin" style={linkStyle}>Admin</Link>
        <Link to="/my-orders" style={linkStyle}>My Orders</Link>
        <Link to="/admin-orders" style={linkStyle}>Admin Orders</Link>
      </div>

      {/* 🔥 Logout Button Right Side */}
      <button
        onClick={handleLogout}
        style={{
          padding: "8px 14px",
          cursor: "pointer",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#ff4d4d",
          color: "#fff",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;