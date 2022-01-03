import express from 'express'
import {
  getLessons,
  createLesson,
  // getLesson,
  updateLesson,
  deleteLesson,
} from "../controllers/lesson";
const router = express.Router();

router.get("/lessons", getLessons);
router.post("/lessons", createLesson);

// router.get("/lessons/:id", getLesson);
router.patch("/lessons/:id", updateLesson);
router.delete("/lessons/:id", deleteLesson);

export default router;