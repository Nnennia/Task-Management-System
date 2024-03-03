const express = require("express");
const auth = require("../handler/admin.auth.handler");
const authRouter = express.Router();

authRouter.route("/auth").post(auth);

module.exports = authRouter;
