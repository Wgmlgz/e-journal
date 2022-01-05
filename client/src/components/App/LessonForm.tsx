import { useEffect, useState } from "react";
import { getGroup } from "../../api/api";

interface LessonFormProps {
  onSubmit: (lesson: Lesson) => any;
  onCancel?: () => any;
  lesson: Lesson;
  card?: boolean;
}
const borderStyle = {
  border: "1px solid gray",
  padding: "8px 10px",
};
export default function LessonForm(props: LessonFormProps) {
  const [card, setCard] = useState(!!props.card);
  const [lesson, setLesson] = useState<Lesson>(props.lesson);

  const [table, setTable] = useState<object>(lesson.marks);

  useEffect(() => {
    (async () => {
      console.log(lesson);
      
      try {
        const res = await getGroup(lesson.group);
        console.log(res);
        setTable({
          ...Object.fromEntries(res.data.map((user: string) => [user, ""])),
          ...table,
        });
      } catch (error: any) {
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.group]);

  return (
    <div>
      {!card ? (
        <div>
          <div>
            <input
              type="date"
              value={lesson.date.toISOString().split("T")[0]}
              onChange={(e) =>
                setLesson({ ...lesson, date: new Date(e.target.value) })
              }
            />
          </div>
          <div>
            имя учителя
            <input
              type="text"
              value={lesson.teacher}
              onChange={(e) =>
                setLesson({ ...lesson, teacher: e.target.value })
              }
            />
          </div>
          <div>
            предмет
            <input
              type="text"
              value={lesson.subject}
              onChange={(e) =>
                setLesson({ ...lesson, subject: e.target.value })
              }
            />
          </div>
          <div>
            группа
            <input
              type="text"
              value={lesson.group}
              onChange={(e) => setLesson({ ...lesson, group: e.target.value })}
            />
          </div>
          <div>
            тема
            <input
              type="text"
              value={lesson.theme}
              onChange={(e) => setLesson({ ...lesson, theme: e.target.value })}
            />
          </div>
          <div>
            дз
            <input
              type="text"
              value={lesson.homework}
              onChange={(e) =>
                setLesson({ ...lesson, homework: e.target.value })
              }
            />
          </div>
          <button onClick={() => setCard(true)}> оценки и дз </button>
        </div>
      ) : (
        <div>
          <div>
            Группа: {lesson.group}. {lesson.date.toDateString()}
          </div>
          <div>
            <table role="table">
              <thead>
                <tr role="row">
                  <th role="columnheader" style={borderStyle}>
                    N
                  </th>
                  <th role="columnheader" style={borderStyle}>
                    Ученик
                  </th>
                  <th role="columnheader" style={borderStyle}>
                    Оценка
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(table).map((record, index) => {
                  return (
                    <tr role="row">
                      <td role="cell" style={borderStyle}>
                        {index + 1}
                      </td>
                      <td role="cell" style={borderStyle}>
                        {record[0]}
                      </td>
                      <td role="cell" style={borderStyle}>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          onChange={(e) => {
                            setLesson({
                              ...lesson,
                              marks: {
                                ...lesson.marks,
                                [record[0]]: e.target.value,
                              },
                            });
                          }}
                          defaultValue={record[1]}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <label> дз: </label>
            <input
              type="text"
              value={lesson.homework}
              onChange={(e) =>
                setLesson({ ...lesson, homework: e.target.value })
              }
            />
          </div>
          <button onClick={() => setCard(false)}> закрыть оценки и дз </button>
        </div>
      )}
      <div>
        <button onClick={() => props.onSubmit(lesson)}> сохранить </button>
        {props.onCancel && (
          <button onClick={() => props.onCancel && props.onCancel()}>
            отмена
          </button>
        )}
      </div>
    </div>
  );
}
