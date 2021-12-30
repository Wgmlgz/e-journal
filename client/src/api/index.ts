import axios from 'axios'

const url = "http://localhost:5000/lesson";

export const fetchLessons = () => axios.get(url);
export const createLesson = (new_lesson: Lesson) => axios.post(url, new_lesson);
