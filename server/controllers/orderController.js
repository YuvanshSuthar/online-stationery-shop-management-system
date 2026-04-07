import Order from "../models/Order.js";

// ✅ Create Order
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create order error",
      error: error.message,
    });
  }
};

// ✅ Get My Orders (User)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Fetch my orders error",
      error: error.message,
    });
  }
};

// ✅ Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Fetch all orders error",
      error: error.message,
    });
  }
};

// ✅ 🔥 Update Order Status (NEW FUNCTION)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update order status error",
      error: error.message,
    });
  }
};

// ✅ Delete My Order (User)
export const deleteMyOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order removed successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Delete my order error",
      error: error.message,
    });
  }
};

// ✅ Delete Order (Admin)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order removed successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Delete order error",
      error: error.message,
    });
  }
};
