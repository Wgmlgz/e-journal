type Lesson = {
  date: Date;
  teacher: string;
  subject: string;
  group: string;
  theme: string;
  homework: string;
  marks: Map<string, string>;
};

type FullLesson = {
  date: Date;
  teacher: string;
  subject: string;
  group: string;
  theme: string;
  homework: string;
  marks: Map<string, string>;
  _id: string;
};

type StudentLesson = {
  date: string;
  subject: string;
  theme: string;
  homework: string;
  mark: string;
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
