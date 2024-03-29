import { Router } from 'express';
import authMiddleware from '../../middleware/auth';
import { createTask, deleteTask, updateTask, updateTaskPosition } from './task.controller';
const router = Router();

router.post('/', authMiddleware, createTask);
router.put('/:task_id', authMiddleware, updateTask);
router.delete('/:task_id', authMiddleware, deleteTask);
router.post('/update-position', authMiddleware, updateTaskPosition);

export default router;
