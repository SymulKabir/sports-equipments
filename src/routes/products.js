import express from "express";
const router = express.Router();
import Product from "../DB/models/products/index.js";

// -------- POST: Insert new product --------
router.post("/data", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const data = await newProduct.save();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error inserting data into database");
  }
});

// -------- GET: Fetch all products --------
router.get("/data", async (req, res) => {
  try {
    const data = await Product.find({});
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching data from database");
  }
});

// -------- GET: Fetch limited/random products --------
router.get("/data-limit", async (req, res) => {
  try {
    const data = await Product.aggregate([{ $sample: { size: 6 } }]);
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching random data from database");
  }
});

// -------- GET: Fetch single product by ID --------
router.get("/data/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) res.json(product);
    else res.status(404).json({ error: "Product not found" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
});

// -------- PUT: Update product by ID --------
router.put("/data/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };
  delete updateData._id;

  try {
    const result = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (result) res.status(200).json({ message: "Product updated successfully", data: result });
    else res.status(404).json({ error: "Product not found" });
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
});

// -------- DELETE: Remove product by ID --------
router.delete("/data/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findByIdAndDelete(id);
    if (result) res.status(200).send("Deleted successfully");
    else res.status(404).send("Product not found");
  } catch (error) {
    res.status(500).send("Error deleting data");
  }
});

export default router;
