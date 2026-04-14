import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import TimeTable from "./features/timetable/pages/TimeTable";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Student from "./features/student/pages/Student";
import AddStudent from "./features/student/pages/AddStudent";
import StudentDetails from "./features/student/pages/StudentDetails";
import Teacher from "./features/teacher/pages/Teacher";
import AddTeacher from "./features/teacher/pages/AddTeacher";
import TeacherDetails from "./features/teacher/pages/TeacherDetails";
import Staff from "./features/staff/pages/Staff";
import AddStaff from "./features/staff/pages/AddStaff";
import StaffDetails from "./features/staff/pages/StaffDetails";
import Parent from "./features/parent/pages/Parent";
import Design from "./features/design/pages/Design";
import Attendance from "./features/attendance/pages/Attendance";
import Exam from "./features/exam/pages/Exam";
import Log from "./features/log/pages/Log";
import Setting from "./features/setting/pages/Setting";
import AcademicStructure from "./features/academic/pages/AcademicStructure";
import Classes from "./features/academic/pages/Classes";
import Sections from "./features/academic/pages/Sections";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Default Route */}
          <Route index element={<Dashboard />} />

          {/* Feature Routes */}
          <Route path="student/all" element={<Student />} />
          <Route path="student/add" element={<AddStudent />} />
          <Route path="student/:id" element={<StudentDetails />} />
          <Route
            path="student"
            element={<Navigate to="/student/all" replace />}
          />
          <Route path="teacher/all" element={<Teacher />} />
          <Route path="teacher/add" element={<AddTeacher />} />
          <Route path="teacher/:id" element={<TeacherDetails />} />
          <Route
            path="teacher"
            element={<Navigate to="/teacher/all" replace />}
          />
          <Route path="staff/all" element={<Staff />} />
          <Route path="staff/add" element={<AddStaff />} />
          <Route path="staff/:id" element={<StaffDetails />} />
          <Route path="staff" element={<Navigate to="/staff/all" replace />} />
          <Route path="academic/structure" element={<AcademicStructure />} />
          <Route path="academic/classes" element={<Classes />} />
          <Route path="academic/sections" element={<Sections />} />
          <Route
            path="academic"
            element={<Navigate to="/academic/structure" replace />}
          />
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
