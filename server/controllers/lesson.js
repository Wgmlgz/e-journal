import LessonMessage from "../models/lesson_message.js";
import mongoose from "mongoose";

export const getLessons = async (req, res) => {
  try {
    const lessonMessages = await LessonMessage.find();
    res.status(200).json(lessonMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createLesson = async (req, res) => {
  try {
    const { date, teacher, group, theme, homework } = req.body;
    const newLessonMessage = new LessonMessage({
      date,
      teacher,
      group,
      theme,
      homework,
    });
    await newLessonMessage.save();
    res.status(201).json(newLessonMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
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

// export const updateLesson = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, message, creator, selectedFile, tags } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(404).send(`No post with id: ${id}`);

//     const updatedPost = {
//       creator,
//       title,
//       message,
//       tags,
//       selectedFile,
//       _id: id,
//     };

//     await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//     res.json(updatedPost);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const deleteLesson = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    await LessonMessage.findByIdAndRemove(id);
    res.json({ message: "Lesson deleted successfully." });
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message });
  }
};
