import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  imageUrl: String,
}, { timestamps: true });

const Product = mongoose.model("product", productSchema);

export default Product;
