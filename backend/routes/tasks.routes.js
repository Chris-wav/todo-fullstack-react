const express = require("express");
const router = express.Router();

// Controller
const taskController = require("../controllers/task.controller");

// Get all tasks
router.get("/", taskController.findAll);

// Create a new task
router.post("/", taskController.createTask);

// Delete all completed tasks
router.delete("/completed", taskController.deleteCompleted);

// Delete task by ID
router.delete("/:id", taskController.delete);

// Toggle task completed status
router.patch("/:id", taskController.updateCompleted);

module.exports = router;
