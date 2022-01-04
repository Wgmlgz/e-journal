import axios from "axios";

const url = "http://localhost:5000";
const cred = { withCredentials: true };

/** Teacher */
export const teacherGetLessons = async () =>
  axios.get(`${url}/teacher/lessons`, cred);
export const teacherCreateLesson = async (new_lesson: Lesson) =>
  axios.post(`${url}/teacher/lessons`, new_lesson, cred);
export const teacherUpdateLesson = async (id: string, lesson: Lesson) =>
  axios.patch(`${url}/teacher/lessons/${id}`, lesson, cred);
export const teacherDeleteLesson = async (id: string) =>
  axios.delete(`${url}/teacher/lessons/${id}`, cred);

/** Auth */
export const login = async (login_data: LoginData) =>
  axios.post(`${url}/login`, login_data, cred);
export const logout = async () => axios.post(`${url}/logout`, {}, cred);
export const register = async (register_data: RegisterData) =>
  axios.post(`${url}/register`, register_data, cred);
export const getUser = async () => axios.get(`${url}/user`, cred);

/** Admin */
export const adminGetUsers = async () => axios.get(`${url}/admin/users`, cred);
export const adminUpdateUser = async (id: string, user: UserPermissions) =>
  axios.patch(`${url}/admin/users/${id}`, user, cred);
export const adminDeleteUser = async (id: string) =>
  axios.delete(`${url}/admin/users/${id}`, cred);
export const adminGetLessons = async () =>
  axios.get(`${url}/admin/lessons`, cred);
export const adminCreateLesson = async (new_lesson: Lesson) =>
  axios.post(`${url}/admin/lessons`, new_lesson, cred);
export const adminUpdateLesson = async (id: string, lesson: Lesson) =>
  axios.patch(`${url}/admin/lessons/${id}`, lesson, cred);
export const adminDeleteLesson = async (id: string) =>
  axios.delete(`${url}/admin/lessons/${id}`, cred);

/** Users */
export const getGroup = async (group: string) =>
  axios.get(`${url}/users/group/${group}`, cred);

/** Student */
export const studentGetLessons = async () =>
  axios.get(`${url}/student/lessons`, cred);
