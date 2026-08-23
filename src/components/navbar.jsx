import {
    CheckSquare,
    Plus,
    Calendar,
    ClipboardList,
    Settings,
    CheckCircle2
} from "lucide-react";

function Sidebar({ view, setView, onAddTask }) {
    const navItems = [
        { key: "today", label: "Today", icon: Calendar },
        { key: "upcoming", label: "Upcoming", icon: Calendar },
        { key: "all", label: "All Tasks", icon: ClipboardList },
        { key: "completed", label: "Completed", icon: CheckCircle2 },
    ];

    return (
        <aside className="flex h-full w-70 shrink-0 flex-col justify-between border-r border-slate-200 bg-slate-50 px-4 py-6">
        <div>
            <div className="mb-6 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <CheckSquare size={20} />
            </div>
            <div>
                <p className="text-lg font-bold leading-tight text-slate-900">TaskFlow</p>
                <p className="text-xs text-slate-400">Productivity Hub</p>
            </div>
            </div>

            <button
            onClick={onAddTask}
            className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
            <Plus size={16} strokeWidth={2.5} />
            Add Task
            </button>

            <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
                const Icon = item.icon;
                const active = view === item.key;
                return (
                <button
                    key={item.key}
                    onClick={() => setView(item.key)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                    active
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                >
                    <Icon size={18} />
                    {item.label}
                </button>
                );
            })}
            </nav>

        </div>
        <div className="flex items-center gap-3 border-t border-slate-200 pt-4">
            <img
            src="https://i.pravatar.cc/64?img=47"
            alt="Alex Mercer"
            className="h-9 w-9 rounded-full object-cover"
            />
            <div className="flex-1">
            <p className="text-sm font-semibold text-slate-800">Alex Mercer</p>
            <p className="text-xs text-slate-400">Pro Plan</p>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
            <Settings size={18} />
            </button>
        </div>
        </aside>
    );
}

export default Sidebar;