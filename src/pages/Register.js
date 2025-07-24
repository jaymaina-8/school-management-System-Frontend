import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', grade: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/students/', formData);
            alert('Student registered successfully!');
            setFormData({ name: '', email: '', grade: '' });
        } catch (error) {
            console.error(error);
            alert('Error registering student');
        }
    };

    return (
        <div className="card p-4">
            <h2>Register Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control my-2"
                    placeholder="Student Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control my-2"
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="form-control my-2"
                    placeholder="Grade"
                    required
                />
                <button className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default Register;
