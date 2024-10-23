const express = require("express");

const taskRouter = express.Router();

taskRouter.post("/createTask");
taskRouter.get("/getTask");
taskRouter.get("/getByIdTask/:id");
taskRouter.delete("/deleteByIdTask/:id");
taskRouter.put("/updateByIdTask/:id");

module.exports = taskRouter;
