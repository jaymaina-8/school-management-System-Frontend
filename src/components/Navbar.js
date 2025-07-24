import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand-text">SchoolMS</Link>
                <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>
            </div>

            {/* Navigation Links */}
            <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/students" className="nav-link">Students</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>
        </nav>
    );
}

export default Navbar;
