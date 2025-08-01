import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api";
import Button from "../components/Button";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("password_reset/", { email });
            toast.success("If this email exists, a reset link has been sent.");
            setEmail("");
        } catch {
            toast.error("Error sending reset link.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <Button type="submit" variant="primary" size="large" loading={loading} className="w-full">
                        Send Reset Link
                    </Button>

                    <div className="text-center mt-4">
                        <a
                            href="/login"
                            className="text-sm text-blue-200 hover:text-white transition"
                        >
                            Back to Login
                        </a>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
