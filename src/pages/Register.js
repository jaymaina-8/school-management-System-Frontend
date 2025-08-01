import { useState } from "react";
import { EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import api from "../api";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "STUDENT",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            toast.error("Invalid email format");
            return;
        }
        setLoading(true);

        try {
            await api.post("register/", form);
            toast.success("User registered successfully!");
            setForm({ username: "", email: "", password: "", role: "STUDENT" });
            // Optionally: navigate back to user list (if we create one)
            // navigate("/users");
        } catch {
            toast.error("Error registering user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-teal-600">
            <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Register New User</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg pl-10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg pl-10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg pl-10 pr-10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-300"
                        >
                            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Role */}
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full bg-white/20 text-white border border-white/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        <option value="STUDENT">Student</option>
                        <option value="TEACHER">Teacher</option>
                        <option value="STAFF">Staff</option>
                        <option value="ADMIN">Admin</option>
                    </select>

                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            variant="success"
                            size="large"
                            loading={loading}
                            className="w-full mt-4"
                        >
                            Register
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full mt-4"
                            onClick={() => navigate("/admin")}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
