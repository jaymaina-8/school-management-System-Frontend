import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components/Dashboard.css';

function Dashboard() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch students with pagination & search
    const fetchStudents = async (pageNum = 1, searchTerm = '') => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/students/?page=${pageNum}&search=${searchTerm}`);
            setStudents(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 5)); // based on PAGE_SIZE
            setPage(pageNum);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Handle Search
    const handleSearch = (e) => {
        setSearch(e.target.value);
        fetchStudents(1, e.target.value);
    };

    // Handle Delete
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/students/${id}/`);
                fetchStudents(page, search);
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Handle Edit
    const handleEdit = async (id) => {
        const name = prompt("Enter new name:");
        const grade = prompt("Enter new grade:");
        const email = prompt("Enter new email:");
        if (name && grade && email) {
            try {
                await axios.put(`http://127.0.0.1:8000/api/students//${id}/`, { name, grade, email });
                fetchStudents(page, search);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Welcome to the School Management System</p>

            {/* Search */}
            <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={handleSearch}
                className="search-box"
            />

            {/* Quick Stats Section */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Students</h3>
                    <p>{students.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Teachers</h3>
                    <p>85</p>
                </div>
                <div className="stat-card">
                    <h3>Classes</h3>
                    <p>32</p>
                </div>
                <div className="stat-card">
                    <h3>Attendance</h3>
                    <p>96%</p>
                </div>
            </div>

            {/* Students List Section */}
            <div className="students-list">
                <h2>Registered Students</h2>
                {students.length === 0 ? (
                    <p>No students found.</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Grade</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id}>
                                <td>{index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.grade}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button onClick={() => handleEdit(student.id)} className="btn btn-sm btn-warning">Edit</button>
                                    <button onClick={() => handleDelete(student.id)} className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => fetchStudents(i + 1, search)}
                        className={`page-btn ${page === i + 1 ? 'active' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
