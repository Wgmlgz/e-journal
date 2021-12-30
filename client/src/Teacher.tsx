import Table from "./Table";

interface TeacherProps {
  lessons: Array<Lesson>;
}
export default function Teacher(props: TeacherProps) {
  const new_data = props.lessons.map((lesson) => {
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
      enableRowSpan: true,
    },
    {
      Header: "Группа",
      accessor: "group",
      enableRowSpan: true,
    },
    {
      Header: "Тема",
      accessor: "theme",
      enableRowSpan: true,
    },
    {
      Header: "Домашняя работа",
      accessor: "homework",
      enableRowSpan: true,
    },
  ];

  return <Table columns={columns} data={new_data} />;
}
