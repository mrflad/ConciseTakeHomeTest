const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

// Define your task routes
router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getTaskById);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTaskById);
router.delete('/:id', TaskController.deleteTaskById);

module.exports = router;