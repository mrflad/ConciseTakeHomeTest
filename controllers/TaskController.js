const { User, Group, Task } = require('../models');

const TaskController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.findAll({ include: User });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTaskById: async (req, res) => {
    const taskId = req.params.id;
    try {
      const task = await Task.findByPk(taskId, { include: User });
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTask: async (req, res) => {
    const { name, deadline, userId } = req.body;

    try {
      // Check if the user with the given ID exists
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Create the task with the specified details
      const newTask = await Task.create({
        name,
        deadline,
        userId,
      });

      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create task', error: error.message });
    }
  },

  updateTaskById: async (req, res) => {
    const taskId = req.params.id;
    const { name, deadline, userId } = req.body;

    try {
      // Check if the task with the given ID exists
      const task = await Task.findByPk(taskId);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      // Check if the user with the new user ID exists
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update task details
      task.name = name || task.name;
      task.deadline = deadline || task.deadline;
      task.userId = userId || task.userId;

      // Save the updated task
      await task.save();

      res.json(task);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update task', error: error.message });
    }
  },

  deleteTaskById: async (req, res) => {
    const taskId = req.params.id;

    try {
      // Check if the task with the given ID exists
      const task = await Task.findByPk(taskId);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      // Delete the task
      await task.destroy();

      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete task', error: error.message });
    }
  },

  // Implement other task-related controllers
};

module.exports = TaskController;