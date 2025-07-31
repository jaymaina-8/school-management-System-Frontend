import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-blue-600 p-4 flex justify-between items-center">
            <Link to="/dashboard" className="text-white font-bold text-lg">School Management</Link>
            <div className="flex space-x-4">
                {user?.role === "ADMIN" && (
                    <>
                        <Link to="/students" className="text-white hover:underline">Students</Link>
                        <Link to="/teachers" className="text-white hover:underline">Teachers</Link>
                        <Link to="/staff" className="text-white hover:underline">Staff</Link>
                    </>
                )}
                {user?.role === "TEACHER" && (
                    <Link to="/students" className="text-white hover:underline">Students</Link>
                )}
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
