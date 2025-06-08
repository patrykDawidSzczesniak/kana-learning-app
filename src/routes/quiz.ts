
import express from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  getQuiz,
  submitQuiz,
  getFreeplayQuiz,
} from "../controllers/quizController";

const router = express.Router();

router.get("/:alphabet/:level", asyncHandler(getQuiz));
router.post("/submit", asyncHandler(submitQuiz));
router.post("/freeplay", asyncHandler(getFreeplayQuiz));

export default router;
