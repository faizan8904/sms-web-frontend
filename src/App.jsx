import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import TimeTable from './features/timetable/pages/TimeTable';
import Dashboard from './features/dashboard/pages/Dashboard';
import Student from './features/student/pages/Student';
import Teacher from './features/teacher/pages/Teacher';
import Staff from './features/staff/pages/Staff';
import Parent from './features/parent/pages/Parent';
import Design from './features/design/pages/Design';
import Attendance from './features/attendance/pages/Attendance';
import Exam from './features/exam/pages/Exam';
import Log from './features/log/pages/Log';
import Setting from './features/setting/pages/Setting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Default Route */}
          <Route index element={<Dashboard />} />

          {/* Feature Routes */}
          <Route path="student" element={<Student />} />
          <Route path="teacher" element={<Teacher />} />
          <Route path="staff" element={<Staff />} />
          <Route path="parent" element={<Parent />} />
          <Route path="timetable" element={<TimeTable />} />
          <Route path="design/*" element={<Design />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="exam" element={<Exam />} />
          <Route path="logs" element={<Log />} />
          <Route path="settings" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
