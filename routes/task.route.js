const express = require("express");
const task = require("../handler/task.handler");
const taskRouter = express.Router();
taskRouter.post("/task", task);
taskRouter.get("/task", task);
module.exports = taskRouter;
