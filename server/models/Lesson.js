import mongoose from "mongoose";

const lessonSchema = mongoose.Schema({
  date: Date,
  teacher: String,
  group: String,
  theme: String,
  homework: String,
  marks: {
    type: Map,
    of: String,
  },
});

const LessonMessage = mongoose.model("LessonMessage", lessonSchema);
export default LessonMessage;