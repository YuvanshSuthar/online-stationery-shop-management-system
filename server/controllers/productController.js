import Product from "../models/Product.js";
import jwt from "jsonwebtoken";
import seedProducts from "../data/seedProducts.js";

const sanitizeProductForCustomer = (product) => ({
  _id: product._id,
  name: product.name,
  price: product.price,
  description: product.description,
  image: product.image,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
});

const isAdminRequest = (req) => {
  const authorization = req.headers.authorization || "";
  if (!authorization.startsWith("Bearer ")) {
    return false;
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded?.role === "admin";
  } catch (error) {
    return false;
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, image, category } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({ message: "Name, price and stock are required" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      stock,
      image,
      category,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create product error",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find().sort({ createdAt: -1 });

    if (!products.length) {
      await Product.insertMany(seedProducts);
      products = await Product.find().sort({ createdAt: -1 });
    }

    if (isAdminRequest(req)) {
      return res.status(200).json(products);
    }

    return res
      .status(200)
      .json(products.map((product) => sanitizeProductForCustomer(product)));
  } catch (error) {
    res.status(500).json({
      message: "Fetch products error",
      error: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (isAdminRequest(req)) {
      return res.status(200).json(product);
    }

    return res.status(200).json(sanitizeProductForCustomer(product));
  } catch (error) {
    res.status(500).json({
      message: "Fetch single product error",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update product error",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete product error",
      error: error.message,
    });
  }
};

export const seedDemoProducts = async (req, res) => {
  try {
    const names = seedProducts.map((product) => product.name);
    const existingProducts = await Product.find({ name: { $in: names } }).select("name");
    const existingNameSet = new Set(existingProducts.map((product) => product.name));

    const productsToInsert = seedProducts.filter(
      (product) => !existingNameSet.has(product.name)
    );

    if (!productsToInsert.length) {
      return res.status(200).json({
        message: "Demo products already exist",
        insertedCount: 0,
      });
    }

    await Product.insertMany(productsToInsert);

    return res.status(201).json({
      message: "Demo products added successfully",
      insertedCount: productsToInsert.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Seed products error",
      error: error.message,
    });
  }
};
