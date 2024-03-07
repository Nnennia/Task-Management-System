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
      const { username, title, description, dueDate } = req.body;

      if (!username || !title || !description || !dueDate) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const updatedAt = new Date();

      const query = { username, "taskAssigned.title": title };
      const update = {
        $set: {
          "taskAssigned.$.description": description,
          "taskAssigned.$.dueDate": dueDate,
          "taskAssigned.$.updatedAt": updatedAt,
        },
      };

      const options = { new: true };
      const updatedTask = await UserInfo.findOneAndUpdate(
        query,
        update,
        options
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
          .json({ error: `${username} not found !` });
      }

      return res.status(200).json({ tasks: userTasks.taskAssigned });
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ error: "Internal server Error" });
    }
  } else if (action === "delete") {
    try {
      //const { username, taskAssigned } = req.body;
      if (!username || !taskAssigned) {
        return res.status(400).json({ error: "Missing required field" });
      }
      const user = await UserInfo.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const task = await UserInfo.findOneAndDelete({ taskAssigned });
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (action === "finishTask") {
    try {
      const completedAt = new Date();
      const updatedTask = await UserInfo.findByIdAndUpdate(
        taskAssigned,
        { completedAt },
        { new: true }
      );
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
      return res
        .status(200)
        .json({ message: `Task : ${title} completed at ${completedAt}` });
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ error: "Internal server Error" });
    }
  } else {
    return res.status(400).json({ error: "Invalid action" });
  }
};

module.exports = task;
