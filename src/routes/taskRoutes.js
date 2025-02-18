import express from 'express';
import { validateTask, handleValidationErrors } from '../middleware/validation.js';
import { authenticateUser } from '../middleware/auth.js';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateUser);

router.post('/', validateTask, handleValidationErrors, createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', validateTask, handleValidationErrors, updateTask);
router.delete('/:id', deleteTask);

export default router;