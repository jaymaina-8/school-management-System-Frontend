import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Typography, Container } from "@mui/material";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Welcome, {user?.username}</Typography>
            <Typography variant="h6">Role: {user?.role}</Typography>
            <Button variant="contained" color="error" onClick={logout} sx={{ mt: 3 }}>
                Logout
            </Button>
        </Container>
    );
};
export default Dashboard;
