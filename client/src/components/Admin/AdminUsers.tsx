import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { adminGetUsers, adminUpdateUser } from "../../api/api";

export default function AdminUsers() {
  const [users, setUsers] = useState<Array<UserPermissions>>([]);
  const [user, setUser] = useState<UserPermissions>();
  const [edit, setEdit] = useState(false);

  const setup = () => {
    adminGetUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  };
  useEffect(setup, []);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
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
        {users.map((user) => (
          <div key={user.username}>
            {user.username}
            <button
              onClick={() => {
                setEdit(true);
                setUser(user);
              }}
            >
              изменить
            </button>
          </div>
        ))}
      </div>
      {edit && user && (
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
            <ReactJson
              quotesOnKeys={false}
              src={user}
              displayDataTypes={false}
              enableClipboard={false}
              iconStyle="circle"
              onEdit={(edit) => {
                setUser(edit.updated_src as UserPermissions);
              }}
              onAdd={(edit) => {
                setUser(edit.updated_src as UserPermissions);
              }}
            />
            <button
              onClick={() => {
                adminUpdateUser(user._id, user)
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((error) => {
                    if (error.response) {
                      alert(error.response.data.message);
                    }
                  });
                setup();
              }}
            >
              сохранить
            </button>
            <button onClick={() => setEdit(false)}> отмена </button>
          </div>
        </div>
      )}
    </div>
  );
}
