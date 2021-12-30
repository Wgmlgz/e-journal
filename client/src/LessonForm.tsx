import React, { FormEvent, useState } from "react";

interface LessonFormProps {
  onSubmit: (lesson: Lesson) => any;
}
export default function LessonForm(props: LessonFormProps) {
  const [lesson, setLesson] = useState<Lesson>({
    date: new Date(),
    teacher: "",
    group: "",
    theme: "",
    homework: "",
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit(lesson);
      }}
    >
      <div>
        date
        <input
          type="date"
          onChange={(e) => setLesson({ ...lesson, date: new Date(e.target.value) })}
        />
      </div>
      <div>
        teacher name
        <input
          type="text"
          onChange={(e) => setLesson({ ...lesson, teacher: e.target.value })}
        />
      </div>
      <div>
        group
        <input
          type="text"
          onChange={(e) => setLesson({ ...lesson, group: e.target.value })}
        />
      </div>
      <div>
        theme
        <input
          type="text"
          onChange={(e) => setLesson({ ...lesson, theme: e.target.value })}
        />
      </div>
      <div>
        homework
        <input
          type="text"
          onChange={(e) => setLesson({ ...lesson, homework: e.target.value })}
        />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
}
