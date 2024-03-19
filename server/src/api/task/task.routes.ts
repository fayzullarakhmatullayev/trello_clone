import { Router } from 'express';
import authMiddleware from '../../middleware/auth';
import { createTask, deleteTask, updateTask } from './task.controller';
const router = Router();

router.post('/', authMiddleware, createTask);
router.put('/:task_id', authMiddleware, updateTask);
router.delete('/task_id', authMiddleware, deleteTask);

export default router;
