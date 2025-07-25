// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.styles';

function Sidebar() {
    const role = localStorage.getItem('role') || 'admin'; // TEMP: Replace with AuthContext later

    return (
        <div className="sidebar">
            <h2 className="sidebar-logo">SchoolMS</h2>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                {role === 'admin' && (
                    <>
                        <li><Link to="/dashboard/students">Students</Link></li>
                        <li><Link to="/dashboard/users">Users</Link></li>
                        <li><Link to="/dashboard/classes">Classes</Link></li>
                        <li><Link to="/dashboard/announcements">Announcements</Link></li>
                    </>
                )}
                {role === 'teacher' && (
                    <>
                        <li><Link to="/dashboard/my-classes">My Classes</Link></li>
                        <li><Link to="/dashboard/attendance">Attendance</Link></li>
                        <li><Link to="/dashboard/grades">Grades</Link></li>
                    </>
                )}
                {role === 'student' && (
                    <>
                        <li><Link to="/dashboard/profile">Profile</Link></li>
                        <li><Link to="/dashboard/my-grades">My Grades</Link></li>
                        <li><Link to="/dashboard/announcements">Announcements</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Sidebar;
