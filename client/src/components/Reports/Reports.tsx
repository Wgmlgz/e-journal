const Reports = () => (
  <div
    style={{
      height: '100%',
      width: '100wh',
      display: 'grid',
      justifyItems: 'center',
      alignContent: 'center',
    }}
  >
    <button
      onClick={() => {
        window.location.replace('/reports/group');
      }}
    >
      Составить отчет по группе
    </button>
    <button
      onClick={() => {
        window.location.replace('/reports/student');
      }}
    >
      Составить отчет по студентам
    </button>
  </div>
);
export default Reports;
