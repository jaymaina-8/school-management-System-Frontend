import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";
import Button from "../components/Button";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        try {
            await api.post("password_reset/confirm/", { token, password });
            toast.success("Password reset successful! Please log in.");
            navigate("/login");
        } catch {
            toast.error("Invalid or expired token.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-teal-600">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />
                    <Button type="submit" variant="success" size="large" loading={loading} className="w-full">
                        Reset Password
                    </Button>

                    <div className="text-center mt-4">
                        <a
                            href="/login"
                            className="text-sm text-green-200 hover:text-white transition"
                        >
                            Back to Login
                        </a>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
