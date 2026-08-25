import {
    CheckSquare,
    Plus,
    Calendar,
    ClipboardList,
    Settings,
    CheckCircle2
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar({ onAddTask }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        navigate("/");
    };

    const navItems = [
        {
            path: "/dashboard/today",
            label: "Today",
            icon: Calendar
        },
        {
            path: "/dashboard/upcoming",
            label: "Upcoming",
            icon: Calendar
        },
        {
            path: "/dashboard/all",
            label: "All Tasks",
            icon: ClipboardList
        },
        {
            path: "/dashboard/completed",
            label: "Completed",
            icon: CheckCircle2
        },
    ];

    return (
        <aside
                    className="
                fixed
                bottom-0
                left-0
                right-0
                z-50
                flex
                h-16
                shrink-0
                flex-col
                border-t
                border-slate-200
                bg-slate-50
                px-2
                py-1

                lg:static
                lg:h-screen
                lg:w-64
                lg:justify-between
                lg:border-r
                lg:border-t-0
                lg:px-4
                lg:py-6
            "
        >

            {/* Desktop Content */}
            <div className="lg:block">

                {/* Logo */}
                <div className="mb-6 hidden items-center gap-3 px-2 lg:flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                        <CheckSquare size={20} />
                    </div>

                    <div>
                        <p className="text-lg font-bold leading-tight text-slate-900">
                            TaskFlow
                        </p>

                        <p className="text-xs text-slate-400">
                            Productivity Hub
                        </p>
                    </div>
                </div>

                {/* Add Task */}
                <button
                    onClick={onAddTask}
                    className="
                        hidden
                        lg:mb-6
                        lg:flex
                        lg:w-full
                        lg:items-center
                        lg:justify-center
                        lg:gap-2
                        lg:rounded-xl
                        lg:bg-indigo-600
                        lg:py-3
                        lg:text-sm
                        lg:font-semibold
                        lg:text-white
                        lg:shadow-sm
                        lg:transition
                        lg:hover:bg-indigo-700
                    "
                >
                    <Plus size={16} strokeWidth={2.5} />
                    Add Task
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden flex-col gap-1 lg:flex">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                                        isActive
                                            ? "bg-indigo-100 text-indigo-700"
                                            : "text-slate-600 hover:bg-slate-100"
                                    }`
                                }
                            >
                                <Icon size={18} />
                                {item.label}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Desktop User */}
            <div className="hidden items-center gap-3 border-t border-slate-200 pt-4 lg:flex">

                <img
                    src="https://i.pravatar.cc/64?img=47"
                    alt="Alex Mercer"
                    className="h-9 w-9 rounded-full object-cover"
                />

                <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                        Alex Mercer
                    </p>

                    <p className="text-xs text-slate-400">
                        Pro Plan
                    </p>
                </div>

                <button
                onClick={handleLogout}
                className="flex items-center text-slate-400 hover:text-slate-600 gap-1 text-sm font-medium transition">
                    <Settings size={18} /> log out
                </button>

            </div>

            {/* Mobile Navigation */}
            <nav className="flex h-full w-full items-center justify-around lg:hidden">

                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex h-full flex-col items-center justify-center gap-0.5 px-2 text-[10px] font-medium ${
                                    isActive
                                        ? "text-indigo-600"
                                        : "text-slate-500"
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}

                {/* Mobile Settings */}
                <button
                    onClick={handleLogout}
                    className="flex h-full flex-col items-center justify-center gap-0.5 px-2 text-[10px] font-medium text-slate-500 transition hover:text-red-500"
                >
                    <Settings size={20} />
                    <span>Logout</span>
                </button>

                {/* Mobile Add Task */}
                <button
                    onClick={onAddTask}
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-indigo-600
                        text-white
                        shadow-md
                        active:scale-95
                    "
                >
                    <Plus size={21} strokeWidth={2.5} />
                </button>
            </nav>

        </aside>
    );
}

export default Sidebar;