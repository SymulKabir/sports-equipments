import mongoose from "mongoose";

const dbUri = "mongodb://localhost:27017/myDatabaseName";

mongoose.connect(dbUri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));
