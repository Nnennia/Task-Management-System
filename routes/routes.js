const express = require("express");
const auth = require("../handler/admin.auth.handler");
const login = require("../handler/user.auth.handler");
const task = require("../handler/task.handler");

const authRouter = express.Router();
const loginRouter = express.Router();
const taskRouter = express.Router();

authRouter.route("/auth").post(auth);
loginRouter.route("/login").post(login);
taskRouter.route("/task").post(task).get(task);

module.exports = { authRouter, loginRouter, taskRouter };
