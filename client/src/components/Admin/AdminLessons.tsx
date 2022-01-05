import LessonsView from "../App/LessonsView";

const Admin = () => (
  <div
    style={{
      height: "100%",
      width: "100wh",
      display: "grid",
      justifyItems: "center",
      alignContent: "center",
    }}
  >
    <LessonsView teacher={false} />
    <p> нажмите 2 раза на урок, чтобы изменить </p>
  </div>
);
export default Admin;
