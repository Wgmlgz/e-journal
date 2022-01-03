import LessonMessage from "../models/Lesson";
import mongoose from "mongoose";
import { Request, Response } from "express";

export const getLessons = async (req: Request, res: Response) => {
  try {
    const lessonMessages = await LessonMessage.find();
    res.status(200).json(lessonMessages);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const createLesson = async (req: Request, res: Response) => {
  try {
    const { date, teacher, group, theme, homework, marks } = req.body;
    const newLessonMessage = new LessonMessage({
      date,
      teacher,
      group,
      theme,
      homework,
      marks,
    });
    await newLessonMessage.save();
    res.status(201).json(newLessonMessage);
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
    const { id } = req.params;
    const { date, teacher, group, theme, homework, marks } = req.body;

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

    await LessonMessage.findByIdAndUpdate(id, updatedLesson, { new: true });

    res.json(updatedLesson);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    await LessonMessage.findByIdAndRemove(id);
    res.json({ message: "Lesson deleted successfully." });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
