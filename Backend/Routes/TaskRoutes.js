const express = require("express");
const { Task } = require("../Scheme/Task");

const router = express.Router();
const task = new Task();

router.get("/GetAllTaskList", async (req, res) => {
  try {
    const result = await task.GetCurrentUserTaskList();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server Error",
    });
  }
});

router.put("/UpdateTaskCompletion/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        status: 400,
        message: "completed must be true or false",
      });
    }

    const result = await task.UpdateCurrentUserTaskForCompletion(
      taskId,
      completed
    );

    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server Error",
    });
  }
});

module.exports = router;