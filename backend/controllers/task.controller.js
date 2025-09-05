const Task = require("../models/tasksModel");

// Get all tasks
exports.findAll = async (req, res) => {
  try {
    const tasks = await Task.find();
    tasks
      ? res.json({ status: true, data: tasks })
      : res.status(404).json({ status: false, message: "No tasks found" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Delete a task by ID
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask)
      return res.status(404).json({ status: false, message: "Task not found" });

    res.json({ status: true, data: deletedTask });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const taskData = req.body;
  if (!taskData)
    return res.status(400).json({ status: false, message: "Request body is empty" });

  try {
    const newTask = new Task(taskData);
    await newTask.save();
    res.status(201).json({ status: true, data: newTask });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ status: false, message: "Task title already exists" });
    }
    res.status(500).json({ status: false, message: err.message });
  }
};

// Update the completed status of a task
exports.updateCompleted = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      { completed },
      { new: true } // επιστρέφει το ενημερωμένο έγγραφο
    );

    if (!updatedTask)
      return res.status(404).json({ status: false, message: "Task not found" });

    res.json({ status: true, data: updatedTask });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Delete all completed tasks
exports.deleteCompleted = async (req, res) => {
  try {
    const result = await Task.deleteMany({ completed: true });
    res.json({ status: true, deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
