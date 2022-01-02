import axios from "axios";

const url = "http://localhost:5000";

const cred = { withCredentials: true };
/** Teacher */
export const fetchLessons = async () => axios.get(`${url}/teacher/lessons`);
export const createLesson = async (new_lesson: Lesson) =>
  axios.post(`${url}/teacher/lessons`, new_lesson);
export const updateLesson = async (id: string, lesson: Lesson) =>
  axios.patch(`${url}/teacher/lessons/${id}`, lesson);
export const deleteLesson = async (id: string) =>
  axios.delete(`${url}/teacher/lessons/${id}`);

/** Auth */
export const login = async (login_data: LoginData) =>
  axios.post(`${url}/login`, login_data, cred);
export const logout = async () => axios.post(`${url}/logout`, {}, cred);
export const register = async (register_data: RegisterData) =>
  axios.post(`${url}/register`, register_data, cred);
export const getUser = async () => axios.get(`${url}/user`, cred);

/** Admin */
export const getUsers = async () => axios.get(`${url}/admin/users`, cred);
export const updateUser = async (id: string, user: UserPermissions) =>
  axios.patch(`${url}/admin/users/${id}`, user, cred);
export const deleteUser = async (id: string) =>
  axios.delete(`${url}/admin/users/${id}`, cred);

/** Users */
export const getGroup = async (group: string) =>
  axios.get(`${url}/users/group/${group}`, cred);
