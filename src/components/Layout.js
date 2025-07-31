import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Layout = ({ children }) => {
    const { user, logout } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { path: "/dashboard", label: "Dashboard" },
        ...(user?.role === "ADMIN"
            ? [
                { path: "/students", label: "Manage Students" },
                { path: "/teachers", label: "Manage Teachers" },
                { path: "/staff", label: "Manage Staff" },
            ]
            : user?.role === "TEACHER"
                ? [{ path: "/students", label: "View Students" }]
                : []),
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar (overlay for mobile) */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-700 text-white p-4 transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold">School System</h1>
                    <button
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <nav>
                    <ul className="space-y-3">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="block py-2 px-3 rounded hover:bg-blue-800"
                                    onClick={() => setSidebarOpen(false)} // close on click
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button
                    onClick={logout}
                    className="mt-6 w-full bg-red-500 hover:bg-red-600 p-3 rounded"
                >
                    Logout
                </button>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <div className="flex items-center justify-between bg-white p-4 shadow lg:hidden">
                    <button onClick={() => setSidebarOpen(true)}>
                        <Bars3Icon className="h-6 w-6 text-gray-700" />
                    </button>
                    <h2 className="text-lg font-bold">School Management</h2>
                </div>
                {/* Page Content */}
                <div className="p-6 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
