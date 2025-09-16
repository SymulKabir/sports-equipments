import express from "express";
import Users from "../DB/models/users/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from '../shared/functions/verifyToken.js'
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const body = req.body;

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = new Users({
      ...body,
      password: hashedPassword,
    });

    const data = await newUser.save();
    data.password = null;

    const token = jwt.sign(
      { id: data._id, email: data.email },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1d" }
    );

    res.json({ message: "Sign up successful", data: data, token });
  } catch (error) {
    console.error("error--->>", error);
    res.status(500).send("Error inserting data into database");
  }
});

// Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // for GET we take query params

    console.log({email, password})
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    user.password = null;

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", data: user, token });
  } catch (error) {
    console.error("Login error --->>", error);
    res.status(500).send("Error during login");
  }
});
 

// GET: Check login / verify token
router.get("/check-login", verifyToken, async (req, res) => {
  try {
    const user = await Users.findById(req.userId).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User verified", data: user });
  } catch (error) {
    console.error("Check-login error --->>", error);
    res.status(500).send("Error verifying user");
  }
});

export default router;
