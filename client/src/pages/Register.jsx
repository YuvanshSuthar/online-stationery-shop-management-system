import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    alert("Logged out successfully");
    window.location.href = "/login";
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  };

  return (
    <div
      style={{
        padding: "15px 25px",
        background: "#222",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/products" style={linkStyle}>Products</Link>

      {token && <Link to="/cart" style={linkStyle}>Cart</Link>}
      {token && <Link to="/my-orders" style={linkStyle}>My Orders</Link>}

      {user?.role === "admin" && <Link to="/admin" style={linkStyle}>Admin</Link>}
      {user?.role === "admin" && <Link to="/admin-orders" style={linkStyle}>Admin Orders</Link>}

      {!token && <Link to="/login" style={linkStyle}>Login</Link>}
      {!token && <Link to="/register" style={linkStyle}>Register</Link>}

      {token && (
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 14px",
            cursor: "pointer",
            borderRadius: "6px",
            border: "none",
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;