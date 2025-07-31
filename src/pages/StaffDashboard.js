import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Typography, Button } from "@mui/material";

const StaffDashboard = () => {
    const { logout } = useContext(AuthContext);
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Staff Dashboard</Typography>
            <Typography>Welcome to the staff portal.</Typography>
            <Button variant="contained" color="error" onClick={logout} sx={{ m: 1 }}>Logout</Button>
        </Container>
    );
};
export default StaffDashboard;
