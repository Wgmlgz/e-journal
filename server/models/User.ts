import mongoose, { Document } from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  group: string;
  lessons: string[];
  admin: boolean;
  head_teacher: boolean;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  group: {
    type: String,
  },
  lessons: [String],
  admin: {
    type: Boolean,
    required: true,
  },
  head_teacher: {
    type: Boolean,
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
