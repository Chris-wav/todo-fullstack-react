const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");

router.get("/", taskController.findAll);
router.post("/", taskController.createTask);
router.delete("/completed", taskController.deleteCompleted);
router.delete("/:id", taskController.delete);
router.patch("/:id", taskController.updateCompleted);

module.exports = router;
