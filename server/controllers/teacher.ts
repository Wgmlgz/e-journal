import LessonModel from "../models/Lesson";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { IUser } from "../models/User";

const ensureTeacher = (req: Request) => {
   if (req.isUnauthenticated()) throw new Error("you are not logged in");
   if (!(req.user as IUser).lessons.length)
     throw new Error("you are not a teacher");
}

export const getLessons = async (req: Request, res: Response) => {
  try {
    ensureTeacher(req);
    const lessonMessages = await LessonModel.find({
      teacher: (req.user as IUser).username,
    });
    res.status(200).json(lessonMessages);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const createLesson = async (req: Request, res: Response) => {
  try {
    ensureTeacher(req);
    const { date, subject, group, theme, homework, marks } = req.body;
    const teacher = (req.user as IUser).username;
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


export const updateLesson = async (req: Request, res: Response) => {
  try {
    ensureTeacher(req);

    const { id } = req.params;
    const { date, group, theme, homework, marks } = req.body;
    const teacher = (req.user as IUser).username;

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
    ensureTeacher(req);

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    
    await LessonModel.findByIdAndRemove(id);
    res.json({ message: "Lesson deleted successfully." });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
