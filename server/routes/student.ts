import express from "express";
import { getLessons } from "../controllers/student";

const router = express.Router();

router.get("/lessons", getLessons);

export default router;
