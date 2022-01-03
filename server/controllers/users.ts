import { Request, Response } from "express";
import User from "../models/User";

export const getGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const users = await User.find();
    const usernames = users
      .filter((user) => user.group === id)
      .map((user) => user.username);
    res.status(200).json(usernames);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
