import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, TextField, Button, Typography } from "@mui/material";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ username: "", password: "" });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form.username, form.password);
            window.location.href = "/dashboard";
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: "100px" }}>
            <Typography variant="h5" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth label="Username" name="username"
                    value={form.username} onChange={handleChange} margin="normal"
                />
                <TextField
                    fullWidth label="Password" type="password" name="password"
                    value={form.password} onChange={handleChange} margin="normal"
                />
                <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Login</Button>
            </form>
        </Container>
    );
};

export default Login;
