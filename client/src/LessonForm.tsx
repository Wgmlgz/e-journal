import React, { FormEvent, useState } from "react";

interface LessonFormProps {
  onSubmit: (lesson: Lesson) => any;
  onCancel?: () => any;
  lesson: Lesson;
}
export default function LessonForm(props: LessonFormProps) {
  const [lesson, setLesson] = useState<Lesson>(
    props.lesson
  );

  return (
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
        teacher name
        <input
          type="text"
          value={lesson.teacher}
          onChange={(e) => setLesson({ ...lesson, teacher: e.target.value })}
        />
      </div>
      <div>
        group
        <input
          type="text"
          value={lesson.group}
          onChange={(e) => setLesson({ ...lesson, group: e.target.value })}
        />
      </div>
      <div>
        theme
        <input
          type="text"
          value={lesson.theme}
          onChange={(e) => setLesson({ ...lesson, theme: e.target.value })}
        />
      </div>
      <div>
        homework
        <input
          type="text"
          value={lesson.homework}
          onChange={(e) => setLesson({ ...lesson, homework: e.target.value })}
        />
      </div>
      <div>
        <button onClick={() => props.onSubmit(lesson)}>submit</button>
        {props.onCancel && <button onClick={() => props.onCancel && props.onCancel()}>cancel</button>}
      </div>
    </div>
  );
}
