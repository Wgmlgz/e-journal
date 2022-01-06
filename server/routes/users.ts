import express from 'express';
import { getGroup } from '../controllers/users';
const router = express.Router();

router.get('/group/:id', getGroup);

export default router;
