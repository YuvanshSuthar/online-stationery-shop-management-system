import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = user?.role === "admin";

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
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/products" style={linkStyle}>Products</Link>
        <Link to="/cart" style={linkStyle}>Cart</Link>

        {!token && <Link to="/login" style={linkStyle}>Login</Link>}
        {!token && <Link to="/register" style={linkStyle}>Register</Link>}

        {token && <Link to="/my-orders" style={linkStyle}>My Orders</Link>}

        {isAdmin && <Link to="/admin" style={linkStyle}>Admin</Link>}
        {isAdmin && <Link to="/admin-orders" style={linkStyle}>Admin Orders</Link>}
      </div>

      {token && (
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
      )}
    </div>
  );
};

export default Navbar;
