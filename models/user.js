const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  userPassword: { type: String },
  taskAssigned: {
    tile: { type: String },
    description: { type: String },
    createdAt: Date,
    updatedAt: Date,
    dueDate: Date,
    completedAt: Date,
  },
});
const UserInfo = mongoose.model("UserInfo", userSchema);

module.exports = UserInfo;
