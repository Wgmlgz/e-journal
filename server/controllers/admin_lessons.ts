import User, { IUser } from "../models/User";
import mongoose from "mongoose";
import { Request, Response } from "express";
import LessonModel from "../models/Lesson";

const ensureAdmin = (req: Request) => {
  if (req.isUnauthenticated()) throw new Error("you are not logged in");
  if (!(req.user as IUser).admin) throw new Error("you are not admin");
};

export const getLessons = async (req: Request, res: Response) => {
  try {
    ensureAdmin(req);
    const lessons = await LessonModel.find();
    res.status(200).json(lessons);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const createLesson = async (req: Request, res: Response) => {
  try {
    ensureAdmin(req);
    const { date, teacher, subject, group, theme, homework, marks } = req.body;
    if (
      date === undefined ||
      teacher === undefined ||
      group === undefined ||
      theme === undefined ||
      homework === undefined ||
      marks === undefined
    )
      return res.status(404).send(`Fill all fields`);
    const newLesson = new LessonModel({
      date,
      teacher,
      subject,
      group,
      theme,
      homework,
      marks,
    });
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }
};

// export const getLesson = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const post = await LessonMessage.findById(id);
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const updateLesson = async (req: Request, res: Response) => {
  try {
    ensureAdmin(req);

    const { id } = req.params;
    const { date, teacher, group, theme, homework, marks } = req.body;

    if (
      date === undefined ||
      teacher === undefined ||
      group === undefined ||
      theme === undefined ||
      homework === undefined ||
      marks === undefined
    )
      return res.status(404).send(`Fill all fields`);
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No lesson with id: ${id}`);

    const updatedLesson = {
      date,
      teacher,
      group,
      theme,
      homework,
      marks,
      _id: id,
    };

    await LessonModel.findByIdAndUpdate(id, updatedLesson, { new: true });

    res.json(updatedLesson);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  try {
    ensureAdmin(req);

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    await LessonModel.findByIdAndRemove(id);
    res.json({ message: "Lesson deleted successfully." });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
