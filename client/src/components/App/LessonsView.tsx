import { useEffect, useState } from "react";
import {
  getUser,
  teacherUpdateLesson,
  teacherCreateLesson,
  teacherGetLessons,
  teacherDeleteLesson,
  adminGetLessons,
  adminDeleteLesson,
  adminUpdateLesson,
  adminCreateLesson,
} from "../../api/api";
import LessonForm from "./LessonForm";
import LessonsTable from "./LessonsTable";

interface LessonsViewProps {
  teacher: boolean;
}
export default function LessonsView(props: LessonsViewProps) {
  const [loaded, setLoaded] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedLesson, setEditedLesson] = useState(0);
  const [lessons, setLessons] = useState<Array<FullLesson>>([]);

  const [username, setUsername] = useState("");

  const default_lesson: Lesson = {
    date: new Date(),
    teacher: "teacher's name",
    subject: "subject",
    group: "group",
    theme: "theme",
    homework: "",
    marks: new Map<string, string>(),
  };
  const [lesson, setLesson] = useState<Lesson>(default_lesson);

  const setup = async () => {
    let res = await (props.teacher ? teacherGetLessons : adminGetLessons)();
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

    setUsername(((await getUser()).data as UserPermissions).username);
    setLesson({
      ...default_lesson,
      ...(props.teacher && { teacher: username }),
    });
  };

  useEffect(() => {
    setup();
  }, []);
  return (
    <div>
      {loaded ? (
        <div>
          <LessonsTable
            fields={
              props.teacher
                ? ["date", "subject", "group", "theme", "homework"]
                : ["date", "teacher", "subject", "group", "theme", "homework"]
            }
            lessons={lessons}
            onEdit={(i) => {
              setLesson(lessons[i]);
              setEditedLesson(i);
              setIsEdit(true);
              setShowLessonForm(true);
            }}
            onRemove={async (i) => {
              await (props.teacher
                ? teacherDeleteLesson(lessons[i]._id)
                : adminDeleteLesson(lessons[i]._id));
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
              <div
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "30px",
                }}
              >
                <LessonForm
                  onSubmit={async (lesson: Lesson) => {
                    try {
                      if (isEdit) {
                        (props.teacher
                          ? teacherUpdateLesson
                          : adminUpdateLesson)(
                          lessons[editedLesson]._id,
                          lesson
                        )
                          .then((_) => {})
                          .catch(
                            (err) => err.response && alert(err.response.data)
                          );
                      } else {
                        (props.teacher
                          ? teacherCreateLesson
                          : adminCreateLesson)(lesson)
                          .then((_) => {})
                          .catch(
                            (err) => err.response && alert(err.response.data)
                          );
                      }
                      setShowLessonForm(false);
                      await setup();
                    } catch (err: any) {
                      alert(err.message);
                    }
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
