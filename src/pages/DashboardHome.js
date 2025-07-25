import React from 'react';
import './DashboardHome.css';

function DashboardHome() {
    // Mock data for now
    const stats = [
        { label: 'Students', value: 1200 },
        { label: 'Teachers', value: 85 },
        { label: 'Classes', value: 32 },
        { label: 'Attendance', value: '96%' },
    ];

    return (
        <div className="dashboard-home">
            <h1>Welcome to the School Management System</h1>
            <p className="subtitle">Quick overview of the system</p>

            {/* Stats cards */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div className="stat-card" key={index}>
                        <h3>{stat.label}</h3>
                        <p>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Placeholder for future charts */}
            <div className="charts-section">
                <div className="chart-placeholder">[Attendance Chart Placeholder]</div>
                <div className="chart-placeholder">[Performance Chart Placeholder]</div>
            </div>
        </div>
    );
}

export default DashboardHome;
