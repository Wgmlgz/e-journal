import React from "react";
import Table from "./Table";

interface LessonsTableProps {
  lessons: FullLesson[];
  fields: ("date" | "teacher" | "subject" | "group" | "theme" | "homework")[];
  onEdit?: (id: number) => any;
  onRemove?: (id: number) => any;
}
export default function LessonsTable(props: LessonsTableProps) {
  const columns = [];
  props.fields.includes("date") &&
    columns.push({
      Header: "Day",
      accessor: "date",
      enableRowSpan: true,
    });
  props.fields.includes("teacher") &&
    columns.push({
      Header: "Teacher",
      accessor: "teacher",
    });
  props.fields.includes("subject") &&
    columns.push({
      Header: "Subject",
      accessor: "subject",
    });
  props.fields.includes("group") &&
    columns.push({
      Header: "Group",
      accessor: "group",
    });
  props.fields.includes("theme") &&
    columns.push({
      Header: "Theme",
      accessor: "theme",
    });
  props.fields.includes("homework") &&
    columns.push({
      Header: "Homework",
      accessor: "homework",
    });

  const new_data = props.lessons.map((lesson) => {
    return {
      ...lesson,
      date: lesson.date.toDateString(),
    };
  });
  console.log(props.fields, columns, new_data);

  return (
    <div>
      <Table
        columns={columns}
        data={new_data}
        onEdit={props.onEdit}
        onRemove={props.onRemove}
      />
    </div>
  );
}
