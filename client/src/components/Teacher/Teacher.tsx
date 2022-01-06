import LessonsView from '../App/LessonsView';

export default function Teacher() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100wh',
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'center',
      }}
    >
      <LessonsView teacher={true} />
      <p> нажмите 2 раза на урок, чтобы изменить </p>
    </div>
  );
}
