import User from "../models/User.js";
import mongoose from "mongoose";

const ensureAdmin = (req) => {
  if (req.isUnauthenticated()) throw new Error("you are not logged in");
  if (!req.user.admin) throw new Error("you are not admin");
};

export const getUsers = async (req, res) => {
  try {
    ensureAdmin(req);
    const users = await User.find();
    const users_permissions = [];
    users.forEach((user) => {
      users_permissions.push({
        _id: user._id,
        username: user.username,
        lessons: user.lessons,
        admin: user.admin,
      });
    });
    res.status(200).json(users_permissions);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    ensureAdmin(req);
    const { id } = req.params;

    const { username, lessons, admin } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);
    console.log(2);
    const old_user = User.findById(id);

    const updatedUser = {
      password: old_user.password,
      username: username,
      lessons: lessons,
      admin: admin,
      _id: id,
    };

    console.log("u", updatedUser);
    await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    ensureAdmin(req);
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);

    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
