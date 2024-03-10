const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  userPassword: { type: String },
  adminUser: String,
  taskAssigned: [
    {
      taskId: mongoose.Schema.Types.ObjectId,
      title: { type: String },
      description: { type: String },
      createdAt: Date,
      updatedAt: Date,
      dueDate: Date,
      completedAt: Date,
    },
  ],
});

const AdminInfo = mongoose.model("AdminInfo", userSchema);

module.exports = AdminInfo;
