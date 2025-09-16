import mongoose from "mongoose";
import { DB_URI } from "../shared/constants/variables.js"; 


mongoose.connect(DB_URI, { 
  // useNewUrlParser: true, 
  // useUnifiedTopology: true 
})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));
