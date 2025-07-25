// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [form, setForm] = useState({ username: '', email: '', password: '', role: 'student' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post('http://127.0.0.1:8000/api/register/', form, {
                headers: { Authorization: `Token ${token}` },
            });
            setSuccess('User registered successfully!');
            setTimeout(() => navigate('/users'), 1500);
        } catch (err) {
            setError('Failed to register user.');
        }
    };

    return (
        <div style={{ padding: '50px' }}>
            <h2>Register New User</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                /><br />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                /><br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                /><br />
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select><br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;





// import React, { useState } from 'react';
// import axios from 'axios';
//
// function Register() {
//     const [formData, setFormData] = useState({ name: '', email: '', grade: '' });
//
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://127.0.0.1:8000/api/students/', formData);
//             alert('Student registered successfully!');
//             setFormData({ name: '', email: '', grade: '' });
//         } catch (error) {
//             console.error(error);
//             alert('Error registering student');
//         }
//     };
//
//     return (
//         <div className="card p-4">
//             <h2>Register Student</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="form-control my-2"
//                     placeholder="Student Name"
//                     required
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="form-control my-2"
//                     placeholder="Email"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="grade"
//                     value={formData.grade}
//                     onChange={handleChange}
//                     className="form-control my-2"
//                     placeholder="Grade"
//                     required
//                 />
//                 <button className="btn btn-primary">Register</button>
//             </form>
//         </div>
//     );
// }
//
// export default Register;
