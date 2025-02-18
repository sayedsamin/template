import Task from '../models/Task.js';
import logger from '../utils/logger.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ 
      title, 
      description, 
      status,
      user_id: req.user.id 
    });
    logger.info('Task created', { taskId: task.id, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    logger.error('Task creation failed', { error: error.message, userId: req.user.id });
    res.status(500).json({ error: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll(req.user.id);
    logger.info('Tasks retrieved', { count: tasks.length, userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    logger.error('Tasks retrieval failed', { error: error.message, userId: req.user.id });
    res.status(500).json({ error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id, req.user.id);
    
    if (!task) {
      logger.warn('Task not found', { taskId: id, userId: req.user.id });
      return res.status(404).json({ error: 'Task not found' });
    }
    
    logger.info('Task retrieved', { taskId: id, userId: req.user.id });
    res.json(task);
  } catch (error) {
    logger.error('Task retrieval failed', { taskId: req.params.id, error: error.message, userId: req.user.id });
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    
    const task = await Task.update(id, { 
      title, 
      description, 
      status 
    }, req.user.id);
    
    if (!task) {
      logger.warn('Task not found for update', { taskId: id, userId: req.user.id });
      return res.status(404).json({ error: 'Task not found' });
    }
    
    logger.info('Task updated', { taskId: id, userId: req.user.id });
    res.json(task);
  } catch (error) {
    logger.error('Task update failed', { taskId: req.params.id, error: error.message, userId: req.user.id });
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.delete(id, req.user.id);
    logger.info('Task deleted', { taskId: id, userId: req.user.id });
    res.status(204).send();
  } catch (error) {
    logger.error('Task deletion failed', { taskId: req.params.id, error: error.message, userId: req.user.id });
    res.status(500).json({ error: error.message });
  }
};