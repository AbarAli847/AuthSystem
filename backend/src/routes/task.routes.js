const express = require('express');
const router = express.Router();

const taskController = require('../controller/task.controller');
const protect  = require('../middleware/auth.middleware');  

 

router.post('/tasks', protect, taskController.createTask);
router.get('/tasks', protect, taskController.getAllTasks);
router.get('/tasks/:id', protect, taskController.getTaskById);
router.put('/tasks/:id', protect, taskController.updateTask);
router.delete('/tasks/:id', protect, taskController.deleteTask);

module.exports = router;