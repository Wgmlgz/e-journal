import mongoose from "mongoose";

export interface ILesson extends mongoose.Document {
  date: Date;
  teacher: string;
  subject: string;
  group: string;
  theme: string;
  homework: string;
  marks: Map<string, string>;
}

const lessonSchema = new mongoose.Schema<ILesson>({
  date: Date, 
  teacher: String,
  subject: String,
  group: String,
  theme: String,
  homework: String,
  marks: {
    type: Map,
    of: String,
  },
});

const LessonModel = mongoose.model("Lesson", lessonSchema);
export default LessonModel;