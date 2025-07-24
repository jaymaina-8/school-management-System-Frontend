import React from 'react';
import './components/Login.css'; // Custom styles

function Login() {
    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Please log in to your account</p>
                <form className="login-form">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter your username" />

                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter your password" />

                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="login-footer">
                    Don’t have an account? <a href="/Register">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
