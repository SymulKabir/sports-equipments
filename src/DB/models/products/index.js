import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    categoryName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    rating: { type: String, required: true},
    customization: { type: String, default: "" },
    processingTime: { type: String },
    stockStatus: { type: String },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    image: { type: String, required: true},
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

export default Product;
