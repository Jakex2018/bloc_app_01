import express from "express";
import { register,googleSignup,login } from "../controllers/authController.js";
const authRoutes = express.Router();

authRoutes.post("/register",register);
authRoutes.post("/google-signup",googleSignup);
authRoutes.post("/login",login);

export default authRoutes;
