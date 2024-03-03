const express = require("express");

const login = require("../handler/user.auth.handler");

const loginRouter = express.Router();
loginRouter.route("/login").post(login);

module.exports = loginRouter;
