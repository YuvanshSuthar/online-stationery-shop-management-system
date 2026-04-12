import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ auth, onLogout }) => {
  const navigate = useNavigate();
  const isAdmin = auth?.user?.role === "admin";

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <aside className="sidebar glass-card">
      <div>
        <div className="nav-brand">SHARMA Stationery</div>
        <p className="muted sidebar-user">
          {auth?.user?.name}
          {" "}
          ({isAdmin ? "Admin" : "Customer"})
        </p>
      </div>

      <nav className="nav-links">
        <NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Products
        </NavLink>
        {!isAdmin && (
          <NavLink to="/cart" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Cart
          </NavLink>
        )}
        {!isAdmin && (
          <NavLink to="/my-orders" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            My Orders
          </NavLink>
        )}

        {isAdmin && (
          <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Add Products
          </NavLink>
        )}
        {isAdmin && (
          <NavLink
            to="/admin-orders"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Manage Orders
          </NavLink>
        )}
        {isAdmin && (
          <NavLink
            to="/admin-logins"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Login Records
          </NavLink>
        )}
      </nav>

      <button className="btn btn-danger sidebar-logout" onClick={handleLogoutClick}>
        Logout
      </button>
    </aside>
  );
};

export default Navbar;
