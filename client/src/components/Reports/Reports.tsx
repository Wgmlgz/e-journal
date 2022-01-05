import LessonsView from "../App/LessonsView";

const Reports = () => (
  <div
    style={{
      height: "100%",
      width: "100wh",
      display: "grid",
      justifyItems: "center",
      alignContent: "center",
    }}
  >
    <button
      onClick={() => {
        window.location.replace("/reports/group");
      }}
    >
      Make group report
    </button>
    <button
      onClick={() => {
        window.location.replace("/reports/student");
      }}
    >
      Make student report
    </button>
  </div>
);
export default Reports;
