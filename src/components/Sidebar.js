import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
    return (
        <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen">
            <h2 className="text-xl font-bold mb-6">Menu</h2>
            <ul className="space-y-4">
                <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
                {(role === "ADMIN") && (
                    <>
                        <li><Link to="/students" className="hover:underline">Manage Students</Link></li>
                        <li><Link to="/teachers" className="hover:underline">Manage Teachers</Link></li>
                        <li><Link to="/staff" className="hover:underline">Manage Staff</Link></li>
                    </>
                )}
                {role === "TEACHER" && <li><Link to="/students" className="hover:underline">View Students</Link></li>}
            </ul>
        </aside>
    );
};

export default Sidebar;
