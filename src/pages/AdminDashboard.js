import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const { logout } = useContext(AuthContext);
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Admin Panel</Typography>
            <Button component={Link} to="/students" variant="contained" sx={{ m: 1 }}>Manage Students</Button>
            <Button component={Link} to="/teachers" variant="contained" sx={{ m: 1 }}>Manage Teachers</Button>
            <Button component={Link} to="/staff" variant="contained" sx={{ m: 1 }}>Manage Staff</Button>
            <Button variant="contained" color="error" onClick={logout} sx={{ m: 1 }}>Logout</Button>
        </Container>
    );
};
export default AdminDashboard;
