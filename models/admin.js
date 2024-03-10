const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminUser: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  staff: [
    {
      username: { type: String },
      userPassword: { type: String },
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
    },
  ],
});

const AdminInfo = mongoose.model("AdminInfo", adminSchema);

module.exports = AdminInfo;
