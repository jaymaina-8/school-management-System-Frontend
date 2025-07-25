// src/pages/StudentsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/StudentsPage.styles.css';

function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    const token = localStorage.getItem('token'); // Get token from auth

    const fetchStudents = async (pageNum = 1, searchTerm = '') => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/students/?page=${pageNum}&search=${searchTerm}`,
                { headers: { Authorization: `Token ${token}` } }
            );
            setStudents(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 5));
            setPage(pageNum);
        } catch (err) {
            setError('Failed to load students.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        fetchStudents(1, e.target.value);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/students/${id}/`, {
                    headers: { Authorization: `Token ${token}` },
                });
                fetchStudents(page, search);
            } catch (error) {
                setError('Failed to delete student.');
            }
        }
    };

    const handleModalOpen = (student = null) => {
        setEditingStudent(student);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditingStudent(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            name: form.get('name'),
            grade: form.get('grade'),
            email: form.get('email'),
        };

        try {
            if (editingStudent) {
                await axios.put(`http://127.0.0.1:8000/api/students/${editingStudent.id}/`, data, {
                    headers: { Authorization: `Token ${token}` },
                });
            } else {
                await axios.post(`http://127.0.0.1:8000/api/students/`, data, {
                    headers: { Authorization: `Token ${token}` },
                });
            }
            fetchStudents(page, search);
            handleModalClose();
        } catch (err) {
            setError('Failed to save student.');
        }
    };

    return (
        <div className="students-page">
            <h1>Students Management</h1>
            {error && <p className="error">{error}</p>}

            <div className="top-actions">
                <input
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={handleSearch}
                    className="search-box"
                />
                <button onClick={() => handleModalOpen()} className="btn btn-primary">
                    + Add Student
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : students.length === 0 ? (
                <p>No students found.</p>
            ) : (
                <table className="students-table">
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
                                <button
                                    onClick={() => handleModalOpen(student)}
                                    className="btn-edit"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(student.id)}
                                    className="btn-delete"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

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

            {/* Add/Edit Student Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                defaultValue={editingStudent?.name || ''}
                                required
                            />
                            <input
                                type="text"
                                name="grade"
                                placeholder="Grade"
                                defaultValue={editingStudent?.grade || ''}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                defaultValue={editingStudent?.email || ''}
                                required
                            />
                            <div className="modal-actions">
                                <button type="submit" className="btn btn-primary">Save</button>
                                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudentsPage;
