const express = require("express");
const bodyParser = require("body-parser");
const { db } = require("./config/database");
const app = express();

const authRouter = require("./routes/admin.route");
const loginRouter = require("./routes/login.route");
const taskRouter = require("./routes/task.route");
require("dotenv").config();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.use("/", authRouter);
app.use("/login", loginRouter);
app.use("/", taskRouter);

const server = () => {
  try {
    db();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

server();
