import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { adminGetLessons } from '../../api/api';
import Table from '../App/Table';

export default function GroupReport() {
  const [report_table, setReportTable] = useState(<></>);
  const [group, setGroup] = useState('');

  const makeReport = useCallback(async () => {
    try {
      const res = await adminGetLessons();
      const lessons = res.data;
      const marks = new Map<string, Map<string, [number, number]>>();
      const subjects = new Set<string>();
      lessons.forEach((lesson: Lesson) => {
        if (group !== lesson.group) return;
        subjects.add(lesson.subject);
        for (const [user, mark] of Object.entries(lesson.marks)) {
          if (!mark) continue;

          let [sum, num] = marks.get(user)?.get(lesson.subject) ?? [0, 0];
          sum += Number.parseInt(mark);
          ++num;
          marks.get(user)?.set(lesson.subject, [sum, num]) ??
            marks.set(
              user,
              new Map<string, [number, number]>([[lesson.subject, [sum, num]]])
            );
        }
      });
      const default_marks: any = {};
      [...subjects].forEach((subject) => {
        default_marks[subject] = 'n/a';
      });
      const report: any = [];
      marks.forEach((marks, student) => {
        const student_marks = { ...default_marks };
        student_marks['student'] = student;
        marks.forEach(
          ([sum, num], subject) =>
            (student_marks[subject] = (sum / num).toString())
        );
        console.log(student_marks);
        report.push(student_marks);
      });
      console.log(report);

      setReportTable(
        <Table
          columns={['student', ...subjects].map((str) => ({
            Header: str,
            accessor: str,
          }))}
          data={report}
        />
      );
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
      } else {
        alert(err.message);
      }
    }
  }, [group]);

  return (
    <div
      style={{
        height: '100%',
        width: '100wh',
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'center',
      }}
    >
      <input
        placeholder='group name'
        onChange={(e) => setGroup(e.target.value)}
      />
      <button onClick={makeReport}> составить отчет </button>
      {report_table}
    </div>
  );
}
