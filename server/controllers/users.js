import User from "../models/User.js";

export const getGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const users = await User.find();
    const usernames = users
      .filter((user) => user.group === id)
      .map((user) => user.username);
    res.status(200).json(usernames);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
