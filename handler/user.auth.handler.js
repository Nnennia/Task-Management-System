const UserInfo = require("../models/user");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { username, userPassword } = req.body;
    const user = await UserInfo.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    const validPassword = await bcrypt.compare(userPassword, user.userPassword);

    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    return res
      .status(200)
      .json({ message: `Login Successful. Welcome ${username}!` });
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = login;
