import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

const Login = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        setLoading(true);

        try {
            const res = await api.post("login/", form);
            localStorage.setItem("token", res.data.access);
            setUser(res.data.user);
            toast.success("Welcome back!");

            // Role-based redirect
            if (res.data.user.role === "ADMIN") navigate("/admin");
            else if (res.data.user.role === "TEACHER") navigate("/teacher");
            else if (res.data.user.role === "STAFF") navigate("/staff");
            else navigate("/dashboard");
        } catch {
            toast.error("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
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
                            className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg pl-10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
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
                            className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg pl-10 pr-10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        loading={loading}
                        className="w-full mt-4"
                    >
                        Login
                    </Button>
                    <div className="text-center mt-4">
                        <a
                            href="/forgot-password"
                            className="text-sm text-blue-200 hover:text-white transition"
                        >
                            Forgot Password?
                        </a>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default Login;
