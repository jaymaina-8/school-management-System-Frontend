// src/components/Topbar.js
import React from 'react';
import './Topbar.css';

function Topbar() {
    const username = localStorage.getItem('username') || 'Admin';

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="topbar">
            <span>Welcome, {username}</span>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
    );
}

export default Topbar;
