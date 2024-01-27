import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  OPTVerification,
  followWritter,
  resendOPT,
  updateUser,
  getWritter,
} from "../controllers/userController.js";
const userRoutes = express.Router();
//user verify
userRoutes.post("/verify/:userId/:otp", OPTVerification);
userRoutes.post("/resend-link/:id", resendOPT);

//user routes
userRoutes.post("/follow/:id", userAuth, followWritter);
userRoutes.put("/update-user", userAuth, updateUser);
userRoutes.get("/get-user/:id", getWritter);

export default userRoutes;
