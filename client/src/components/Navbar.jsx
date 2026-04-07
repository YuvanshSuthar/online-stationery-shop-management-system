import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setAuth({ token, user });
  }, [location.pathname]);

  const token = auth.token;
  const isAdmin = auth.user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <header className="nav-wrap">
      <nav className="navbar">
        <div className="nav-brand">Stationery 3D</div>

        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Products
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Cart
          </NavLink>

          {!token && (
            <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Login
            </NavLink>
          )}
          {!token && (
            <NavLink to="/register" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Register
            </NavLink>
          )}

          {token && (
            <NavLink to="/my-orders" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              My Orders
            </NavLink>
          )}

          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Admin
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin-orders" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Admin Orders
            </NavLink>
          )}
        </div>

        {token && (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
