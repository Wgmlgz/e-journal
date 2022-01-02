import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser
} from "../controllers/admin.js";
const router = express.Router();

router.get("/users", getUsers);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
