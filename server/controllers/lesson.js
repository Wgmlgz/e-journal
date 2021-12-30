import LessonMessage from "../models/lesson_message.js";

const test_data = [
  {
    day: "aaaa",
    data: [
      {
        group: "group name",
        theme: "theme name",
        homework: "homework name",
      },
      {
        group: "group name",
        theme: "theme name",
        homework: "homework name",
      },
    ],
  },
  {
    day: "Tuesday",
    data: [
      {
        group: "group name",
        theme: "theme name",
        homework: "homework name",
      },
      {
        group: "group name",
        theme: "theme name",
        homework: "homework name",
      },
      {
        group: "group name",
        theme: "theme name",
        homework: "homework name",
      },
    ],
  },
];
export const getLessons = async (req, res) => {
  try {
    const lessonMessages = await LessonMessage.find();
    res.status(200).json(lessonMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createLesson = async (req, res) => {
    console.log(2);

  const { date, teacher, group, theme, homework } = req.body;

  const newLessonMessage = new LessonMessage({
    date,
    teacher,
    group,
    theme,
    homework,
  });

  try {
    await newLessonMessage.save();
    res.status(201).json(newLessonMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
