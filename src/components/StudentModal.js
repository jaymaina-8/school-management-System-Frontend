// src/components/StudentModal.js
import React, { useState, useEffect } from 'react';
import './styles/StudentModal.css/StudentModal.css';

function StudentModal({ show, onClose, onSave, student }) {
    const [formData, setFormData] = useState({ name: '', grade: '', email: '' });

    useEffect(() => {
        if (student) {
            setFormData({ name: student.name, grade: student.grade, email: student.email });
        } else {
            setFormData({ name: '', grade: '', email: '' });
        }
    }, [student]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="grade"
                        placeholder="Grade"
                        value={formData.grade}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <div className="modal-actions">
                        <button type="submit" className="btn btn-primary">
                            {student ? 'Update' : 'Add'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StudentModal;
