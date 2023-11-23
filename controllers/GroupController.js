const { User, Group, Task } = require('../models');

const GroupController = {
  getAllGroups: async (req, res) => {
    try {
      const groups = await Group.findAll();
      res.json(groups);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getGroupById: async (req, res) => {
    const groupId = req.params.id;
    try {
      const group = await Group.findByPk(groupId, { include: User });
      if (group) {
        res.json(group);
      } else {
        res.status(404).json({ message: 'Group not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createGroup: async (req, res) => {
    const { name, description } = req.body;

    try {
      // Create the group with the specified details
      const newGroup = await Group.create({
        name,
        description,
      });

      res.status(201).json(newGroup);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create group', error: error.message });
    }
  },

  updateGroupById: async (req, res) => {
    const groupId = req.params.id;
    const { name, description } = req.body;

    try {
      // Check if the group with the given ID exists
      const group = await Group.findByPk(groupId);

      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      // Update group details
      group.name = name || group.name;
      group.description = description || group.description;

      // Save the updated group
      await group.save();

      res.json(group);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update group', error: error.message });
    }
  },

  deleteGroupById: async (req, res) => {
    const groupId = req.params.id;

    try {
      // Check if the group with the given ID exists
      const group = await Group.findByPk(groupId);

      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      // Delete the group
      await group.destroy();

      res.json({ message: 'Group deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete group', error: error.message });
    }
  },

  // Implement other group-related controllers
};

module.exports = GroupController;