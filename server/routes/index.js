import authRoutes from "./authRoutes.js";
import postRoutes from "./postRoutes.js";
import userRoutes from "./userRoutes.js";
import express from "express";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);

export default router;
