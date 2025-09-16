import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import "./src/DB/connections.js";
import productsRoutes from "./src/routes/products.js";
import userRoutes from "./src/routes/users.js";

const app = express();
const port = 3000;

// ========================
// Middleware
// ========================
app.use(cors());
app.use(express.json());

// ========================
// Routes
// ========================
app.use("/", productsRoutes);
app.use("/user", userRoutes);

// ========================
// Default Route
// ========================
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ========================
// Start Server
// ========================
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
