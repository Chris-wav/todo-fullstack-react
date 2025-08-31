const { json } = require("express");
const Task = require("../models/tasksModel");

exports.findAll = async (req, res) => {
  console.log("CONSOLE ALL TASKS");
  try {
    const result = await Task.find();
    result
      ? res.json({ status: true, data: result })
      : res.status(404).json({ status: false, message: "No tasks found" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  console.log("DELE TASK VIA ID");
  try {
    const result = await Task.findByIdAndDelete(id);
    if (!result) {
      res.status(500).json({ status: false, message: "Task not found" });
      return;
    }
    res.json({ status: true, data: result });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.createTask = async (req, res) => {
  console.log("INSERT TASK");

  try {
    const result = req.body;
    console.log(result);
    if (!result) {
      return res
        .status(400)
        .json({ status: false, message: "Request body is empty" });
    }

    let newTask = new Task(result);
    await newTask.save();
    const tasks = await Task.find({});
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

exports.updateCompleted = async (req, res) => {
  console.log("UPDATING THE COMPLETED", req.params.id, req.body.completed);
  console.log("UPDATING THE COMPLETED");
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      { completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ status: false, message: "Task not found" });
    }

    res.json({ status: true, data: updatedTask });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.deleteCompleted = async (req, res) => {
  console.log("DELETING COMPLETED TASKS");
  try {
    const result = await Task.deleteMany({ completed: true });
    res.json({ status: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error("❌ Error deleting completed tasks:", err);
    res.status(500).json({ status: false, message: err.message });
  }
};
