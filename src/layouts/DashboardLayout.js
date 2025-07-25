import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './DashboardLayout.css';

function DashboardLayout() {
    const { user, logout } = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(false);

    // Dynamic menu items based on role
    const menuItems = {
        admin: [
            { path: '/dashboard', label: 'Dashboard' },
            { path: '/students', label: 'Students' },
            { path: '/users', label: 'Users' },
            { path: '/classes', label: 'Classes' },
            { path: '/announcements', label: 'Announcements' },
        ],
        teacher: [
            { path: '/dashboard', label: 'Dashboard' },
            { path: '/students', label: 'Students' },
            { path: '/classes', label: 'Classes' },
        ],
        student: [
            { path: '/dashboard', label: 'Dashboard' },
            { path: '/profile', label: 'My Profile' },
            { path: '/announcements', label: 'Announcements' },
        ]
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <h2>{collapsed ? 'SMS' : 'SchoolSys'}</h2>
                    <button onClick={() => setCollapsed(!collapsed)} className="collapse-btn">
                        {collapsed ? '▶' : '◀'}
                    </button>
                </div>
                <ul className="sidebar-menu">
                    {menuItems[user?.role || 'student'].map((item) => (
                        <li key={item.path}>
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <div className="main-content">
                {/* Topbar */}
                <header className="topbar">
                    <div>Welcome, {user?.username || 'Guest'} ({user?.role})</div>
                    <button onClick={logout} className="btn btn-logout">Logout</button>
                </header>

                {/* Page Content */}
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
