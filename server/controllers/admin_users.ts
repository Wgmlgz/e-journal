import User, { IUser } from "../models/User";
import mongoose from "mongoose";
import { Request, Response } from "express";
import LessonModel from "../models/Lesson";

const ensureAdmin = (req: Request) => {
  if (req.isUnauthenticated()) throw new Error("you are not logged in");
  if (!(req.user as IUser).admin) throw new Error("you are not admin");
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    ensureAdmin(req);
    const users = await User.find();
    const users_permissions = users.map((user) => {
      return {
        _id: user._id,
        username: user.username,
        lessons: user.lessons,
        admin: user.admin,
        group: user.group,
      };
    });
    res.status(200).json(users_permissions);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    ensureAdmin(req);
    const { id } = req.params;

    const { username, lessons, admin, group } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);
    console.log(2);
    const old_user: any = User.findById(id);

    const updatedUser = {
      password: old_user.password,
      username: username,
      lessons: lessons,
      admin: admin,
      group: group,
      _id: id,
    };

    console.log("u", updatedUser);
    await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.status(200).json(updatedUser);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    ensureAdmin(req);
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);

    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully." });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
