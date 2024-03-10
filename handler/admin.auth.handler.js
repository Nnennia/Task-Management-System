const AdminInfo = require("../models/admin");
const bcrypt = require("bcrypt");

const auth = async (req, res) => {
  try {
    const { action } = req.query;

    if (action === "signup") {
      const { adminUser, password, email } = req.body;
      const existingAdmin = await AdminInfo.findOne({ adminUser });

      if (existingAdmin) {
        return res.status(400).json({ error: "Admin already exists" });
      }
      function isValidEmail(email) {
        let re = /\S+@\S+\.S+/;
        return re.test(email);
      }
      if (!isValidEmail) {
        return res.status(400).json({ error: "Invalid Email Address" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await AdminInfo.create({
        adminUser,
        password: hashedPassword,
        email,
      });

      return res.status(201).json({ message: "Admin created successfully" });
    } else if (action === "login") {
      const { adminUser, password } = req.body;
      const admin = await AdminInfo.findOne({ adminUser });
      const validPassword = await bcrypt.compare(password, admin.password);

      if (!validPassword || !admin) {
        return res
          .status(401)
          .json({ error: "Incorrect username or password" });
      }

      return res.status(200).json({ message: `Welcome ${adminUser}!` });
    } else if (action === "addUser") {
      const { adminUser, password, staff } = req.body;
      const { username, userPassword } = staff;

      // Authenticate admin
      const admin = await AdminInfo.findOne({ adminUser });
      if (!admin) {
        return res.status(401).json({ error: "Admin not found" });
      }

      // Check if the admin's password is valid
      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      // Create user
      const hashedUserPassword = await bcrypt.hash(userPassword, 10);
      admin.staff.push({
        username,
        userPassword: hashedUserPassword,
      });

      await admin.save();

      return res.status(201).json({ message: "User added successfully" });
    } else if (action === "deleteUser") {
      const { adminUser, username } = req.body;
      if (!username || !adminUser) {
        return res.status(401).json({ error: "Missing requirements" });
      }

      const deleteUser = await AdminInfo.findOneAndDelete({ username });
      if (!deleteUser) {
        return res.status(401).json({ error: `${username} not found` });
      }
      return res.status(200).json({ message: `${username} deleted!` });
    } else if (action === "getUsers") {
      try {
        const { adminUser, password } = req.body;

        // Authenticate admin
        const admin = await AdminInfo.findOne({ adminUser });
        if (!admin) {
          return res.status(401).json({ error: "Admin not found" });
        }

        // Check if the admin's password is valid
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
          return res.status(401).json({ error: "Incorrect password" });
        }

        // Extract usernames from the staff array
        const usernames = admin.staff.map((user) => user.username);

        return res.status(200).json({ usernames });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = auth;
