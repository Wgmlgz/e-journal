import { group } from "console";
import React, { useCallback, useState } from "react";
import { adminGetLessons } from "../../api/api";
import Table from "../App/Table";

export default function StudentsReport() {
  const [report_table, setReportTable] = useState(<></>);

  const makeReport = useCallback(async () => {
    try {
      const res = await adminGetLessons();
      const lessons = res.data;
      const marks = new Map<string, [number, number, string]>();
      lessons.forEach((lesson: Lesson) => {
        for (const [user, mark] of Object.entries(lesson.marks)) {
          if (!mark) continue;

          let [sum, num, group] = marks.get(user) ?? [0, 0, lesson.group];
          sum += Number.parseInt(mark);
          ++num;
          marks.set(user, [sum, num, group]);
        }
      });
      const report: any = [];
      marks.forEach(([sum, num, group], student) => {
        const student_marks: any = {};
        student_marks["student"] = student;
        student_marks["group"] = group;
        student_marks["mark"] = (sum / num).toString();
        console.log(student_marks);
        report.push(student_marks);
      });
      console.log(report);

      setReportTable(
        <Table
          columns={[
            {
              Header: "Ученик",
              accessor: "student",
            },
            {
              Header: "Группа",
              accessor: "group",
            },
            {
              Header: "Оценка",
              accessor: "mark",
            },
          ]}
          data={report}
        />
      );
    } catch (err: any) {
      alert(err.message);
    }
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "100wh",
        display: "grid",
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      <button onClick={makeReport}> составить отчет </button>
      {report_table}
    </div>
  );
}
