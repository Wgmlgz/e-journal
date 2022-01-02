type Lesson = {
  date: Date;
  teacher: string;
  group: string;
  theme: string;
  homework: string;
  marks: Map<string, string>;
};

type FullLesson = {
  date: Date;
  teacher: string;
  group: string;
  theme: string;
  homework: string;
  marks: Map<string, string>;
  _id: string;
};

type RegisterData = {
  username: string;
  password: string;
  password2: string;
};

type LoginData = {
  username: string;
  password: string;
};

type UserPermissions = {
  _id: string;
  username: string;
  lessons: Array<string>;
  group: string;
  admin: boolean;
};
