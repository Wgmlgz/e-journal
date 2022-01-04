import { Request, Response } from "express";
import LessonModel from "../models/Lesson";
import { IUser } from "../models/User";

const ensureStudent = (req: Request) => {
  if (req.isUnauthenticated()) throw new Error("you are not logged in");
  if (!(req.user as IUser).group) throw new Error("you are not student");
};

export const getLessons = async (req: Request, res: Response) => {
  try {
    ensureStudent(req);

    const lessons = await LessonModel.find({
      group: (req.user as IUser).group,
    });
    res.status(200).json(lessons);
  } catch (err:any) {
    res.status(404).send(err.message);
  }
};
