import { useEffect, useState } from "react";
import { getUser, logout } from "../../api/api";

export default function Bar() {
  const [admin, setAdmin] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [student, setStudent] = useState(false);
  const [head_teacher, setHeadTeacher] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    getUser()
      .then((res) => {
        setLogged(res.data);
        setAdmin((res.data as UserPermissions).admin);
        setTeacher(!!(res.data as UserPermissions).lessons.length);
        setStudent(!!(res.data as UserPermissions).group);
        setHeadTeacher((res.data as UserPermissions).head_teacher);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.err);
        }
      });
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        height: "50px",
        borderColor: "#gray",
        border: "solid",
        display: "grid",
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      <div>
        {logged ? (
          <>
            <a href={"/dashboard"}> панель пользователя </a>
          </>
        ) : (
          <>
            <a href={"/register"}> регестрация </a>
            <span>|</span>
            <a href={"/login"}> вход </a>
          </>
        )}
        {student && (
          <>
            <span>|</span>
            <a href={"/student/lessons"}> уроки (ученик) </a>
          </>
        )}
        {teacher && (
          <>
            <span>|</span>
            <a href={"/teacher/lessons"}> уроки (учитель) </a>
          </>
        )}
        {admin && (
          <>
            <span>|</span>
            <a href={"/admin/lessons"}> уроки (админ) </a>
            <span>|</span>
            <a href={"/admin/users"}> пользователи (админ) </a>
          </>
        )}
        {head_teacher && (
          <>
            <span>|</span>
            <a href={"/reports"}> отчеты (завуч) </a>
          </>
        )}
        <button
          onClick={async () => {
            try {
              await logout();
              window.location.replace("/login");
            } catch (err: any) {
              alert(err.message);
            }
          }}
        >
          выйти
        </button>
      </div>
    </div>
  );
}
