const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminUser: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const AdminInfo = mongoose.model("AdminInfo", adminSchema);

module.exports = AdminInfo;
