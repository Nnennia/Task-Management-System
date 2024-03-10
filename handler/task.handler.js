const AdminInfo = require("../models/admin");

const task = async (req, res) => {
  const { action } = req.body;
  try {
    if (action === "create") {
      const { staff } = req.body;
      const { username, taskAssigned } = staff;
      if (
        !username ||
        !taskAssigned ||
        !taskAssigned.title ||
        !taskAssigned.description ||
        !taskAssigned.dueDate
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const user = await AdminInfo.findOne({ "staff.username": username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const staffMember = user.staff.find(
        (staff) => staff.username === username
      );
      staffMember.taskAssigned.push({
        title: taskAssigned.title,
        description: taskAssigned.description,
        createdAt: new Date(),
        dueDate: taskAssigned.dueDate,
        completedAt: null,
      });
      await user.save();
      return res
        .status(201)
        .json({ message: `Task created for ${username}`, taskAssigned });
    } else if (action === "update") {
      const { staff } = req.body;
      const { username, taskAssigned } = staff;

      if (
        !username ||
        !taskAssigned.title ||
        !taskAssigned.description ||
        !taskAssigned.dueDate
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const user = await AdminInfo.findOne({ "staff.username": username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const updatedAt = new Date();

      const query = {
        "staff.username": username,
        "staff.taskAssigned.title": title,
      };
      const update = {
        $set: {
          "staff.$[elem].taskAssigned.$[inner].description": description,
          "staff.$[elem].taskAssigned.$[inner].dueDate": dueDate,
          "staff.$[elem].taskAssigned.$[inner].updatedAt": updatedAt,
        },
      };

      const options = {
        arrayFilters: [{ "elem.username": username }, { "inner.title": title }],
        new: true,
      };
      const updatedTask = await AdminInfo.findOneAndUpdate(
        query,
        update,
        options
      );

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res
        .status(200)
        .json({ message: `Task updated for ${username}`, taskAssigned });
    } else if (action === "get") {
      try {
        const { username } = req.body;

        // Retrieve tasks associated with the given username
        const userTasks = await AdminInfo.findOne({ adminUser: username });

        if (!userTasks) {
          return res.status(404).json({ error: `${username} not found !` });
        }

        return res.status(200).json({ tasks: userTasks.staff[0].taskAssigned });
      } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ error: "Internal server Error" });
      }
    } else if (action === "delete") {
      try {
        const { username, taskAssigned } = req.body;
        const { title } = taskAssigned;
        if (!username || !title) {
          return res.status(400).json({ error: "Missing required field" });
        }
        const user = await AdminInfo.findOne({ adminUser: username });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const task = await AdminInfo.findOneAndUpdate(
          { adminUser: username },
          { $pull: { "staff.$[elem].taskAssigned": { title } } },
          { arrayFilters: [{ "elem.username": username }] }
        );
        if (!task) {
          console.log("Task not found for:", taskAssigned);
          return res.status(404).json({ error: "Task not found" });
        }
        return res
          .status(200)
          .json({ message: `Task deleted for ${username}` });
      } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else if (action === "finishTask") {
      try {
        const { username, title } = req.body;
        const completedAt = new Date();
        const updatedTask = await AdminInfo.findOneAndUpdate(
          { adminUser: username, "staff.taskAssigned.title": title },
          { $set: { "staff.$[elem].taskAssigned.$.completedAt": completedAt } },
          { arrayFilters: [{ "elem.username": username }] }
        );
        if (!updatedTask) {
          return res.status(404).json({ error: "Task not found" });
        }
        return res
          .status(200)
          .json({ message: `Task: ${title} completed at ${completedAt}` });
      } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ error: "Internal server Error" });
      }
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = task;
