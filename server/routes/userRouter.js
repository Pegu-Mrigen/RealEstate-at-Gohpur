import express from "express";

import {
  getPublicProfile,
  getUserProfile,
  updateProfile,
} from "./../controllers/userController.js";
import upload from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/user-profile", protect, getUserProfile);
userRouter.put(
  "/user-profile",
  protect,
  upload.single("profilePic"),
  updateProfile
);
userRouter.get("/public/:id", getPublicProfile);

export default userRouter;
