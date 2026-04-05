import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;