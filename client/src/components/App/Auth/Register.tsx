import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../../api/api";
export default function Login() {
  const [data, setData] = useState<RegisterData>({
    username: "",
    password: "",
    password2: "",
  });
  return (
    <div
      style={{
        height: "100vh",
        width: "100wh",
        display: "grid",
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          alignContent: "center",
        }}
      >
        <div>
          <label>
            <b> Username </b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </div>
        <div>
          <label>
            <b> Password </b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div>
          <label>
            <b> Confirm password </b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setData({ ...data, password2: e.target.value })}
          />
        </div>
        <br />

        <button
          onClick={async () => {
            register(data)
              .then((res) => {
                 if (res.data !== "User Created") {
                   alert(res.data);
                 } else {
                   alert("Successfully registered");
                   window.location.replace("/login");
                 }
              })
              .catch((error) => {
                if (error.response) {
                  alert(error.response.data.err);
                }
              });
          }}
        >
          register
        </button>
        <br />
        <div>
          <label> {"already have accout? ->"}</label>
          <Link to={"/login"}>log in</Link>
        </div>
      </div>
    </div>
  );
}
