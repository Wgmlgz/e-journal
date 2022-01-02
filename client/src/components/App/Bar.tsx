import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../api/api";

export default function Bar() {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    getUser()
      .then((response) => {
        setAdmin(response.data.admin);
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
        <a href={"/register"}> register </a>|<a href={"/login"}> login </a>|
        <a href={"/dashboard"}> dashboard </a>|
        {admin && <a href={"/admin/lessons"}> lessons(admin) </a>}|
        {admin && <a href={"/admin/users"}> users(admin) </a>}
      </div>
    </div>
  );
}
