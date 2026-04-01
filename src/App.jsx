import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import TimeTable from './features/timetable/pages/TimeTable';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/timetable" replace />} />
          <Route path="timetable" element={<TimeTable />} />
          {/* Add other routes here later */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
