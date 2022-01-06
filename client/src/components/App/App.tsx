import Teacher from '../Teacher/Teacher';
import Login from './Auth/Login';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Register from './Auth/Register';
import Dashboard from './Auth/Dashboard';
import Bar from './Bar';
import AdminLessons from '../Admin/AdminLessons';
import AdminUsers from '../Admin/AdminUsers';
import Student from '../Student/Student';
import Reports from '../Reports/Reports';
import GroupReport from '../Reports/GroupReport';
import StudentReport from '../Reports/StudentsReport';

function App() {
  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <Bar />
      <div
        style={{
          height: 'calc(100vh - 100px)',
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/admin/lessons' element={<AdminLessons />} />
            <Route path='/admin/users' element={<AdminUsers />} />
            <Route path='/teacher/lessons' element={<Teacher />} />
            <Route path='/student/lessons' element={<Student />} />
            <Route path='/admin' element={<AdminLessons />} />
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/reports/student' element={<StudentReport />} />
            <Route path='/reports/group' element={<GroupReport />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
