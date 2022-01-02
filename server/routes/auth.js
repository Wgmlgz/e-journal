import express from "express";
import { getUser, login, register } from "../controllers/auth.js";
const router = express.Router();

router.post("/login", login);
// router.post("/logout", logout);
router.post("/register", register);
router.get("/user", getUser);

export default router;
