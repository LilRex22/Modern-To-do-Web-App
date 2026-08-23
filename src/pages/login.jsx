import { useState } from "react";
import { CheckCircle2, User, Lock } from "lucide-react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ username, password, rememberMe });
    };

    return (
        <div className="min-h-screen w-full bg-indigo-50 flex items-center justify-center p-6">
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
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
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
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
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
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
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
                Login
                </button>

                <small className="block text-xs font-medium text-slate-500 text-center mt-4">
                    Don't have an account?{" "}
                    <a href="#" className="text-indigo-600 hover:text-indigo-700">
                        Sign up
                    </a>
                </small>
            </form>
            </div>
        </div>
        </div>
    );
    }

export default Login;