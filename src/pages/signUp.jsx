import { useState } from "react";
import { CheckCircle2, User, Lock} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MessageBox from "../components/message";

function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null)

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({}); // Clear previous errors

        if (formData.username === "") {
            setError({
                username: ["Username is required."],
            });
            return;
        }

        if (formData.password === "") {
            setError({
                password: ["Password is required."],
            });
            return;
        }

        if (formData.password.length < 8) {
            setError({
                password: ["Password must be at least 8 characters long."],
            });
            return;
        }

        if (formData.confirm_password === "") {
            setError({
                confirm_password: ["Please confirm your password."],
            });
            return;
        }

        if (formData.password !== formData.confirm_password) {
            setError({
                confirm_password: ["Passwords do not match."],
            });
            return;
        }

        setSubmitting(true);
        try {
            await axios.post("http://localhost:8000/api/register/", formData);
            setMessage({
                text: "Registration successful! Please log in.",
                type: "success",
            });
            navigate("/");
        } catch (error) {
            if (error.response?.data) {
                setError(error.response.data);
            }
            console.error("Error registering:", error.response?.data.detail);
            setMessage({
                text: error.response?.data?.detail || "An error occurred during registration.",
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
                    Sign Up for TaskFlow in one click
                </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                placeholder="Enter a username"
                                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            {error.username && (
                                <p className="text-red-500 text-sm mt-1">
                                    {error.username[0]}
                                </p>
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
                                <p className="text-red-500 text-sm mt-1">
                                    {error.password[0]}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label
                                htmlFor="confirm_password"
                                className="text-xs font-semibold tracking-wide text-slate-600"
                                >
                                CONFIRM PASSWORD
                                </label>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                id="confirm_password"
                                type="password"
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            {error.confirm_password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {error.confirm_password[0]}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg bg-indigo-700 text-white text-sm font-semibold hover:bg-indigo-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                        {submitting ? "Signing up…" : "Sign up"}
                        </button>

                        <small className="block text-xs font-medium text-slate-500 text-center mt-4">
                            Already have an account?{" "}
                            <Link to='/' className="text-indigo-600 hover:text-indigo-700">
                                Login
                            </Link>
                        </small>
                    </form>
                </div>
            </div>
        </div>
    );
    }

export default SignUp;