// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import StudentsPage from './pages/StudentsPage';
import UsersPage from './pages/UsersPage';
import ClassesPage from './pages/ClassesPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import Login from './pages/Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="students" element={<StudentsPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="classes" element={<ClassesPage />} />
                    <Route path="announcements" element={<AnnouncementsPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
