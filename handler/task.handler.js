const UserInfo = require("../models/user");

const task = async (req, res) => {
  const { action, taskAssigned, username } = req.body;

  if (action === "create") {
    try {
      const { title, description, dueDate } = taskAssigned;

      if (!username || !title || !description || !dueDate) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const createdAt = new Date();
      const completedAt = null;
      const user = await UserInfo.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const newTask = new UserInfo({
        taskAssigned: {
          title,
          description,
          createdAt,
          dueDate,
          completedAt,
        },
      });
      await newTask.save();

      return res
        .status(201)
        .json({ message: `Task created for ${username}`, newTask });
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ error: "Internal server Error" });
    }
  } else if (action === "update") {
    try {
      const { title, description, dueDate } = taskAssigned;

      const updatedAt = new Date().toLocaleDateString();

      const updatedTask = await UserInfo.findOneAndUpdate(
        { username, title },
        {
          $set: {
            description,
            dueDate,
            updatedAt,
          },
        },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res
        .status(200)
        .json({ message: `Task updated for ${username}`, updatedTask });
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ error: "Internal server Error" });
    }
  } else if (action === "get") {
    try {
      const { username } = req.body;

      // Retrieve tasks associated with the given username
      const userTasks = await UserInfo.findOne({ username });

      if (!userTasks) {
        return res
          .status(404)
          .json({ error: `${username} not found or has no tasks` });
      }

      return res.status(200).json({ tasks: userTasks.taskAssigned });
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ error: "Internal server Error" });
    }
  } else {
    return res.status(400).json({ error: "Invalid action" });
  }
};

module.exports = task;
