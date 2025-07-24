// src/layouts/DashboardLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './DashboardLayout.css';

function DashboardLayout() {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-main">
                <Topbar />
                <div className="dashboard-content">
                    <Outlet /> {/* Nested pages render here */}
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
