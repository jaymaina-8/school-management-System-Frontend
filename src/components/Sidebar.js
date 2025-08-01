import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ role }) => {
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMgmtOpen, setMgmtOpen] = useState(role === "ADMIN"); // open by default for admin

    const isActive = (path) => location.pathname === path;

    const navLink = (to, label) => (
        <li>
            <Link
                to={to}
                className={`block px-3 py-2 rounded transition ${
                    isActive(to)
                        ? "bg-white/20 text-white font-semibold"
                        : "hover:bg-white/10 text-gray-300"
                }`}
            >
                {label}
            </Link>
        </li>
    );

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="md:hidden p-3 text-white bg-gray-800 fixed top-4 left-4 z-50 rounded"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                ) : (
                    <Bars3Icon className="h-6 w-6" />
                )}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 h-full bg-gray-800 text-white p-4 w-64 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 z-40`}
            >
                <h2 className="text-xl font-bold mb-6">Menu</h2>
                <ul className="space-y-2">
                    {navLink("/dashboard", "Dashboard")}

                    {/* Admin Section */}
                    {role === "ADMIN" && (
                        <>
                            <li>
                                <button
                                    className="flex justify-between items-center w-full px-3 py-2 rounded hover:bg-white/10 text-gray-300"
                                    onClick={() => setMgmtOpen(!isMgmtOpen)}
                                >
                                    <span>Management</span>
                                    {isMgmtOpen ? (
                                        <ChevronDownIcon className="h-4 w-4" />
                                    ) : (
                                        <ChevronRightIcon className="h-4 w-4" />
                                    )}
                                </button>
                                {isMgmtOpen && (
                                    <ul className="ml-4 mt-2 space-y-1">
                                        {navLink("/students", "Manage Students")}
                                        {navLink("/teachers", "Manage Teachers")}
                                        {navLink("/staff", "Manage Staff")}
                                        {navLink("/register", "Register User")}
                                    </ul>
                                )}
                            </li>
                        </>
                    )}

                    {/* Teacher Section */}
                    {role === "TEACHER" && navLink("/students", "View Students")}

                    {/* Staff Section */}
                    {role === "STAFF" && navLink("/dashboard", "My Dashboard")}
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;
