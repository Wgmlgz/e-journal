import Table from "./Table";
import LessonForm from "./LessonForm";
import { fetchLessons, createLesson, deleteLesson } from "./api/index";
import React, { useState, useEffect } from "react";

export default function Teacher() {
  const [loaded, setLoaded] = useState(false);
  const [lessons, setLessons] = useState<Array<FullLesson>>([]);

  const setup = async () => {
    let res = await fetchLessons();
    if (res.status !== 200) return;
    res.data = res.data.map((lesson: any) => {
      return {
        ...lesson,
        date: new Date(lesson.date),
      };
    });
    console.log(res);

    setLessons(res.data);
    setLoaded(true);
  };

  useEffect(() => {
    setup();
  }, []);

  const new_data = lessons.map((lesson) => {
    return {
      ...lesson,
      date: lesson.date.toDateString(),
    };
  });
  console.log(new_data);

  const columns = [
    {
      Header: "День",
      accessor: "date",
      enableRowSpan: true,
    },
    {
      Header: "Преподователь",
      accessor: "teacher",
    },
    {
      Header: "Группа",
      accessor: "group",
    },
    {
      Header: "Тема",
      accessor: "theme",
    },
    {
      Header: "Домашняя работа",
      accessor: "homework",
    },
  ];

  return (
    <div>
      {loaded ? (
        <div>
          <Table
            columns={columns}
            data={new_data}
            onEdit={(i) => console.log(i)}
            onRemove={async (i) => {
              await deleteLesson(lessons[i]._id);
              await setup();
            }}
          />
          <LessonForm
            onSubmit={async (lesson: Lesson) => {
              await createLesson(lesson);
              await setup();
            }}
            lesson={{
              date: new Date(),
              teacher: "teacher's name",
              group: "group",
              theme: "theme",
              homework: "",
            }}
          />
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
