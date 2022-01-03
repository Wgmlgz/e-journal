import LessonsView from "../App/LessonsView";

export default function Teacher() {
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
      <LessonsView teacher={true} />
    </div>
  );
}
