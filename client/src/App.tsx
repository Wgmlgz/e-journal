import React, { useState, useEffect } from "react";
import Teacher from "./Teacher";
import Login from "./Login";
import { fetchLessons, createLesson } from "./api/index";
import LessonForm from "./LessonForm";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<Array<Lesson>>([]);

  const setup = async () => {
    let res = await fetchLessons();
    if (res.status !== 200) return;
    res.data = res.data.map((lesson: any) => {return {
      ...lesson,
      date: new Date(lesson.date),
    }})
    console.log(res);
    
    setData(res.data);
    setLoaded(true);
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="App">
      {loaded ? <Teacher lessons={data} /> : <p>loading...</p>}
      <LessonForm onSubmit={
        async (lesson: Lesson) => {
          console.log(lesson);
          console.log(2);
          const res = await createLesson(lesson);
          console.log(3);
          console.log(res);
        }
      }/>
      {/* <Login /> */}
    </div>
  );
}

export default App;
