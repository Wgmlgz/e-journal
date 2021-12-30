import axios from 'axios'

const url = "http://localhost:5000/teacher/lessons";

export const fetchLessons = async () => axios.get(url);
export const createLesson = async (new_lesson: Lesson) => axios.post(url, new_lesson);
export const deleteLesson = async (id: string) => axios.delete(`${url}/${id}`);
