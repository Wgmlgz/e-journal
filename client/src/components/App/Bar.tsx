import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser, logout } from "../../api/api";

export default function Bar() {
  const [admin, setAdmin] = useState(false);
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    getUser()
      .then((res) => {
        setLogged(res.data);
        setAdmin(res.data.admin);
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
        <a href={"/register"}> register </a>|<a href={"/login"}> login </a>
        {logged && <span>|</span>}
        {logged && <a href={"/dashboard"}> dashboard </a>}
        {admin && <span>|</span>}
        {admin && <a href={"/admin/lessons"}> lessons(admin) </a>}
        {admin && <span>|</span>}
        {admin && <a href={"/admin/users"}> users(admin) </a>}
        <button
          onClick={async () => {
            try {
              console.log("loggin out...");

              await logout();
              console.log("loggin out2...");

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
