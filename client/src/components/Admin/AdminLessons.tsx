import React, { useEffect, useState } from 'react'
import { createLesson, deleteLesson, fetchLessons, updateLesson } from '../../api/api';
import LessonForm from '../App/LessonForm';
import Table from '../App/Table';

export default function Admin() {
  const [loaded, setLoaded] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedLesson, setEditedLesson] = useState(0);
  const [lessons, setLessons] = useState<Array<FullLesson>>([]);
  const default_lesson = {
    date: new Date(),
    teacher: "teacher's name",
    group: "group",
    theme: "theme",
    homework: "",
  };
  const [lesson, setLesson] = useState<Lesson>(default_lesson);

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
      Header: "Day",
      accessor: "date",
      enableRowSpan: true,
    },
    {
      Header: "Teacher",
      accessor: "teacher",
    },
    {
      Header: "Group",
      accessor: "group",
    },
    {
      Header: "Theme",
      accessor: "theme",
    },
    {
      Header: "Homework",
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
            onEdit={(i) => {
              setLesson(lessons[i]);
              setEditedLesson(i);
              setIsEdit(true);
              setShowLessonForm(true);
            }}
            onRemove={async (i) => {
              await deleteLesson(lessons[i]._id);
              await setup();
            }}
          />
          <button
            onClick={() => {
              setLesson(default_lesson);
              setIsEdit(false);
              setShowLessonForm(true);
            }}
          >
            new lesson
          </button>
          {showLessonForm && (
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                height: "100vh",
                width: "100vw",
                backgroundColor: "#11111199",
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{
                backgroundColor: "#fff"
              }}>
                <LessonForm
                  onSubmit={async (lesson: Lesson) => {
                    if (isEdit) {
                      await updateLesson(lessons[editedLesson]._id, lesson);
                    } else {
                      await createLesson(lesson);
                    }
                    setShowLessonForm(false);
                    await setup();
                  }}
                  onCancel={() => {
                    setShowLessonForm(false);
                  }}
                  lesson={lesson}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
