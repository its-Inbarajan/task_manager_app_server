const express = require("express");
const {
  getTask,
  createTask,
  deleteByIdTask,
  getByIdTask,
  updateByIdTask,
} = require("../../controllers/taskControllers/taskControllers");

const taskRouter = express.Router();

taskRouter.post("/createTask", createTask);
taskRouter.get("/getTask", getTask);
taskRouter.get("/getByIdTask/:id", getByIdTask);
taskRouter.delete("/deleteByIdTask/:id", deleteByIdTask);
taskRouter.put("/updateByIdTask/:id", updateByIdTask);

module.exports = taskRouter;
