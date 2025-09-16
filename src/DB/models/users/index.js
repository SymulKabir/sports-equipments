import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  photo: String,
  email: String,
  password: String,  // must be String for bcrypt
}, { timestamps: true });

const Users = mongoose.model("User", userSchema);

export default Users;
