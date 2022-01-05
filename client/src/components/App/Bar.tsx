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
            <a href={"/dashboard"}> dashboard </a>
          </>
        ) : (
          <>
            <a href={"/register"}> register </a>
            <span>|</span>
            <a href={"/login"}> login </a>
          </>
        )}
        {student && (
          <>
            <span>|</span>
            <a href={"/student/lessons"}> lessons(student) </a>
          </>
        )}
        {teacher && (
          <>
            <span>|</span>
            <a href={"/teacher/lessons"}> lessons(teacher) </a>
          </>
        )}
        {admin && (
          <>
            <span>|</span>
            <a href={"/admin/lessons"}> lessons(admin) </a>
            <span>|</span>
            <a href={"/admin/users"}> users(admin) </a>
          </>
        )}
        {head_teacher && (
          <>
            <span>|</span>
            <a href={"/reports"}> reports(admin) </a>
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
          logout
        </button>
      </div>
    </div>
  );
}
