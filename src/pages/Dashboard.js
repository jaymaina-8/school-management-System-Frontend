import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === "ADMIN") navigate("/admin");
        else if (user?.role === "TEACHER") navigate("/teacher");
        else if (user?.role === "STAFF") navigate("/staff");
        else navigate("/login");
    }, [user, navigate]);

    return null; // No UI here, just redirect
};

export default Dashboard;
