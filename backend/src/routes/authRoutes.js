// routes/authRoutes.js
import express from "express";
import { register, login } from "../controllers/authController.js";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Optional but recommended
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
});

export default router;
