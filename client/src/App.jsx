import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminLogins from "./pages/AdminLogins";
import AuthGateway from "./pages/AuthGateway";

const getStoredAuth = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return { token, user };
};

const ProtectedRoute = ({ token }) => {
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

const AdminRoute = ({ role }) => {
  if (role !== "admin") {
    return <Navigate to="/products" replace />;
  }
  return <Outlet />;
};

const PublicOnlyRoute = ({ token }) => {
  if (token) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};

const AppLayout = ({ auth, onLogout }) => (
  <div className="app-shell app-shell-auth">
    <div className="bg-orb bg-orb-one" />
    <div className="bg-orb bg-orb-two" />
    <div className="bg-orb bg-orb-three" />
    <div className="layout-grid">
      <Navbar auth={auth} onLogout={onLogout} />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  </div>
);

function App() {
  const [auth, setAuth] = useState(getStoredAuth);
  const isAdmin = auth.user?.role === "admin";

  const authValue = useMemo(() => auth, [auth]);

  useEffect(() => {
    const handleStorage = () => setAuth(getStoredAuth());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleAuthChange = () => {
    setAuth(getStoredAuth());
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setAuth({ token: null, user: null });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicOnlyRoute token={auth.token} />}>
          <Route path="/" element={<AuthGateway />} />
          <Route path="/login" element={<Login onAuthChange={handleAuthChange} />} />
          <Route
            path="/admin-login"
            element={<Login onAuthChange={handleAuthChange} adminOnly />}
          />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute token={auth.token} />}>
          <Route
            element={<AppLayout auth={authValue} onLogout={handleLogout} />}
          >
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products auth={authValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/my-orders" element={<MyOrders />} />

            <Route element={<AdminRoute role={auth.user?.role} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin-orders" element={<AdminOrders />} />
              <Route path="/admin-logins" element={<AdminLogins />} />
            </Route>
          </Route>
        </Route>

        <Route
          path="*"
          element={<Navigate to={auth.token ? (isAdmin ? "/admin" : "/home") : "/"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
