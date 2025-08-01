import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Staff from "./pages/Staff";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Layout({ children }) {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex">
            {user && <Sidebar role={user.role} />}
            <div className="flex-1">
                <Navbar />
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <Toaster position="top-right" reverseOrder={false} />
                <Routes>
                    {/* Public */}
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/register"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <Layout>
                                    <Register />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />

                    {/* Protected with Layout */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <Dashboard />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <Layout>
                                    <AdminDashboard />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/teacher"
                        element={
                            <ProtectedRoute allowedRoles={["TEACHER"]}>
                                <Layout>
                                    <TeacherDashboard />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/staff"
                        element={
                            <ProtectedRoute allowedRoles={["STAFF"]}>
                                <Layout>
                                    <StaffDashboard />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/students"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]}>
                                <Layout>
                                    <Students />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/teachers"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <Layout>
                                    <Teachers />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/staff"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <Layout>
                                    <Staff />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                </Routes>

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

            </AuthProvider>
        </Router>
    );
}

export default App;
