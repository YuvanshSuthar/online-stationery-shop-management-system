# 🛒 Online Stationery Shop Management System

A full-stack web application where users can browse stationery products, add items to cart, place orders, and admins can manage products and orders.

---

## 🚀 Features

### 👤 User Features
- User Registration and Login
- JWT Authentication
- View Products
- Add to Cart
- Place Orders
- View My Orders

### 🛠 Admin Features
- Add Product
- Update Product
- Delete Product
- View All Orders
- Update Order Status (Pending → Delivered)

---

## 🧑‍💻 Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Security
- JWT (jsonwebtoken)
- bcryptjs (Password hashing)

---

## 📂 Project Structure

ONLINE-STATIONERY-SHOP
│
├── client # React frontend
├── server # Node.js backend
├── README.md
└── .gitignore


---

## ⚙️ Run Project Locally

### 🔹 Step 1: Clone Project
```bash
git clone <your-repo-link>
cd Online-Stationery-Shop

🔹 Step 2: Run Backend
cd server
npm install
npx nodemon server.js

🔹 Step 3: Run Frontend
cd client
npm install
npm run dev


🔐 API Routes
Auth Routes
POST /api/auth/register → Register User
POST /api/auth/login → Login User
Product Routes
GET /api/products → Get All Products
GET /api/products/:id → Get Single Product
POST /api/products → Add Product (Admin)
PUT /api/products/:id → Update Product (Admin)
DELETE /api/products/:id → Delete Product (Admin)
Order Routes
POST /api/orders → Place Order
GET /api/orders/my-orders → User Orders
GET /api/orders → All Orders (Admin)
PUT /api/orders/:id/status → Update Order Status (Admin)
🔑 Roles
👤 User
Browse products
Add to cart
Place order
View own orders
🛠 Admin
Manage products
View all orders
Update order status
🖼 Screenshots

(Add your screenshots here)

🌐 Deployment (Optional)
Frontend → Vercel / Netlify
Backend → Render
Database → MongoDB Atlas
📌 Future Improvements
Search functionality
Category filter
Payment integration
Better UI (Tailwind / Bootstrap)
Product images upload
👨‍💻 Author

Yuvansh Suthar


---

# ✅ `.gitignore` bhi confirm kar le

```bash
node_modules
.env
dist

