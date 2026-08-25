import { useState } from "react";
import { CheckCircle2, User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MessageBox from "../components/message";

function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // the login logic
    const logUserIn = async (e) => {
        e.preventDefault();
        setError({});
        setSubmitting(true);
        try {
            const response = await axios.post("https://modern-to-do-web-app-api.onrender.com/api/token/", {
                username: formData.username,
                password: formData.password,
            });
            console.log(response.data);
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            setMessage({
                text: "Logged in successfully!",
                type: "success",
            });
            navigate("/dashboard/today");
        } catch (error) {
            if (error.response?.data) {
                setError(error.response.data);
            }
            console.error("login failed:", error.response?.data?.detail);
            setMessage({
                text:
                    error.response?.data?.detail ||
                    "An error occurred while logging in.",
                type: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-indigo-50 flex items-center justify-center p-6">
            {message && (
                <MessageBox
                    message={message.text}
                    type={message.type}
                    onClose={() => setMessage(null)}
                />
            )}
            <div className="w-full max-w-sm">
                {/* Logo + heading */}
                <div className="flex flex-col items-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-700 flex items-center justify-center mb-4 shadow-sm">
                    <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">TaskFlow</h1>
                <p className="text-sm text-slate-500 mt-1">
                    Sign in to your productivity hub
                </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                    <form onSubmit={logUserIn} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-xs font-semibold tracking-wide text-slate-600 mb-2"
                            >
                                USERNAME
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            {error.username && (
                                <p className="text-red-500 text-sm mt-1">{error.username[0]}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label
                                htmlFor="password"
                                className="text-xs font-semibold tracking-wide text-slate-600"
                                >
                                PASSWORD
                                </label>
                                <a
                                href="#"
                                className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                                >
                                Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            {error.password && (
                                <p className="text-red-500 text-sm mt-1">{error.password[0]}</p>
                            )}
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-2">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="remember" className="text-sm text-slate-600">
                                Remember me for 30 days
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg bg-indigo-700 text-white text-sm font-semibold hover:bg-indigo-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {submitting ? "Signing in…" : "Sign in"}
                        </button>

                        <small className="block text-xs font-medium text-slate-500 text-center mt-4">
                            Don't have an account?{" "}
                            <Link to='signUp' className="text-indigo-600 hover:text-indigo-700">
                                Sign up
                            </Link>
                        </small>
                    </form>
                </div>
            </div>
        </div>
    );
    }

export default Login;