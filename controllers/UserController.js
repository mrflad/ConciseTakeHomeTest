const { User, Group, Task } = require('../models');

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findByPk(userId, { include: Group });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    const { name, email, phoneNumber, address, groupId } = req.body;

    try {
      // Check if the group with the given ID exists
      const group = await Group.findByPk(groupId);

      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      // Create the user with the specified details
      const newUser = await User.create({
        name,
        email,
        phoneNumber,
        address,
      });

      // Associate the user with the group
      await newUser.addGroup(group);

      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create user', error: error.message });
    }
  },

  updateUserById: async (req, res) => {
    const userId = req.params.id;
    const { name, email, phoneNumber, address, groupId } = req.body;

    try {
      // Check if the user with the given ID exists
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update user details
      user.name = name || user.name;
      user.email = email || user.email;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.address = address || user.address;

      // Check if a new group ID is provided
      if (groupId) {
        // Check if the new group ID is valid
        const group = await Group.findByPk(groupId);
        if (!group) {
          return res.status(404).json({ message: 'Group not found' });
        }

        // Update the user's group
        await user.setGroups([group]);
      }

      // Save the updated user
      await user.save();

      res.json(user);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update user', error: error.message });
    }
  },

  deleteUserById: async (req, res) => {
    const userId = req.params.id;

    try {
      // Check if the user with the given ID exists
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete the user
      await user.destroy();

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
  },
};
module.exports = UserController;