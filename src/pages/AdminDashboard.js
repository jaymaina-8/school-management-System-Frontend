import { useEffect, useState } from "react";
import api from "../api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

const AdminDashboard = () => {
    const [stats, setStats] = useState({ students: 0, teachers: 0, staff: 0, admins: 0 });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const res = await api.get("stats/users/");
            setStats(res.data);
        } catch {
            toast.error("Failed to load stats");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const data = [
        { name: "Students", value: stats.students },
        { name: "Teachers", value: stats.teachers },
        { name: "Staff", value: stats.staff },
        { name: "Admins", value: stats.admins },
    ];

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h2>

            {loading ? (
                <p className="text-white">Loading...</p>
            ) : (
                <>
                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white/20 p-4 rounded-lg text-center">
                            <h3 className="text-xl text-white">Students</h3>
                            <p className="text-3xl font-bold text-green-300">{stats.students}</p>
                        </div>
                        <div className="bg-white/20 p-4 rounded-lg text-center">
                            <h3 className="text-xl text-white">Teachers</h3>
                            <p className="text-3xl font-bold text-blue-300">{stats.teachers}</p>
                        </div>
                        <div className="bg-white/20 p-4 rounded-lg text-center">
                            <h3 className="text-xl text-white">Staff</h3>
                            <p className="text-3xl font-bold text-yellow-300">{stats.staff}</p>
                        </div>
                        <div className="bg-white/20 p-4 rounded-lg text-center">
                            <h3 className="text-xl text-white">Admins</h3>
                            <p className="text-3xl font-bold text-red-300">{stats.admins}</p>
                        </div>
                    </div>

                    {/* Role Distribution Pie Chart */}
                    <div className="bg-white/20 p-6 rounded-lg">
                        <h3 className="text-xl text-white mb-4">User Role Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={data} dataKey="value" nameKey="name" outerRadius={120} fill="#8884d8" label>
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
