const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/GroupController');

// Define your group routes
router.get('/', GroupController.getAllGroups);
router.get('/:id', GroupController.getGroupById);
router.post('/', GroupController.createGroup);
router.put('/:id', GroupController.updateGroupById);
router.delete('/:id', GroupController.deleteGroupById);

module.exports = router;