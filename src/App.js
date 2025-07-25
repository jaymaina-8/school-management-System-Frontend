// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import StudentsPage from './pages/StudentsPage';
import UsersPage from './pages/UsersPage';
import ClassesPage from './pages/ClassesPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import Login from './pages/Login';
import {AuthProvider} from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<PrivateRoute><RegisterPage /></PrivateRoute>} />

                    <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                        <Route path="/dashboard" element={<DashboardHome />} />
                        <Route path="/students" element={<StudentsPage />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/classes" element={<ClassesPage />} />
                        <Route path="/announcements" element={<AnnouncementsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                </Routes>
            </Router>
            </AuthProvider>
    );
}

export default App;
