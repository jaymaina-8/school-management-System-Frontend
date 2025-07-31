import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
    const { logout } = useContext(AuthContext);
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Teacher Dashboard</Typography>
            <Button component={Link} to="/students" variant="contained" sx={{ m: 1 }}>View Students</Button>
            <Button variant="contained" color="error" onClick={logout} sx={{ m: 1 }}>Logout</Button>
        </Container>
    );
};
export default TeacherDashboard;
