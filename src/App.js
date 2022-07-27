import { Routes, Route } from 'react-router-dom';
import './App.scss';

import StudentList from './components/studentList/StudentList';
import Navbar from './layout/navbar/Navbar';
import { StudentDetailPage } from './pages/StudentDetailPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<StudentList />} />
        <Route path="/students/:studentId" element={<StudentDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
