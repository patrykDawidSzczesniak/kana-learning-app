
import express from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", verifyToken, asyncHandler(getUserProfile));
router.post("/login", asyncHandler(loginUser));
router.post("/register", asyncHandler(registerUser));

export default router;
