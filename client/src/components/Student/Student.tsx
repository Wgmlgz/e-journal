import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { getUser, studentGetLessons } from "../../api/api";
import Table from "../App/Table";

export default function Student() {
  const [lessons, setLessons] = useState(new Array<StudentLesson>());
  const setup = useCallback(async () => {
    try {
      const res = await studentGetLessons();
      const user = await getUser();
      const lessons = (res.data as any[]).map((lesson) => ({
        date: new Date(lesson.date).toDateString(),
        subject: lesson.subject,
        theme: lesson.theme,
        homework: lesson.homework,
        mark: lesson.marks[(user.data as UserPermissions).username] ?? "",
      }));
      setLessons(lessons);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data);
      } else if (err instanceof Error) {
        alert(err.message);
      }
      
    }
  }, []);
  useEffect(() => {
    setup();
  }, [setup]);

  return (
     <div
      style={{
        height: "100vh",
        width: "100wh",
        display: "grid",
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      <Table
        columns={[
          {
            Header: "Дата",
            accessor: "date",
          },
          {
            Header: "Предмет",
            accessor: "subject",
          },
          {
            Header: "Тема",
            accessor: "theme",
          },
          {
            Header: "ДЗ",
            accessor: "homework",
          },
          {
            Header: "Оценка",
            accessor: "mark",
          },
        ]}
        data={lessons}
      />
    </div>
  );
}
