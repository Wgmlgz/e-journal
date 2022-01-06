import express from 'express';
import {
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} from '../controllers/admin_lessons';
import { getUsers, updateUser, deleteUser } from '../controllers/admin_users';

const router = express.Router();

router.get('/users', getUsers);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/lessons', getLessons);
router.post('/lessons', createLesson);

// router.get("/lessons/:id", getLesson);
router.patch('/lessons/:id', updateLesson);
router.delete('/lessons/:id', deleteLesson);

export default router;
