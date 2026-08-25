import { Search, Bell } from "lucide-react";

function TopBar({ title, subtitle }) {
    return (
        <div className="flex items-center justify-between border-b border-slate-200 px-10 py-3">
        <div>
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-4">
            <div className="relative">
            <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
                type="text"
                placeholder="Search tasks..."
                className="w-64 rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-600 outline-none placeholder:text-slate-400 focus:border-indigo-400"
            />
            </div>
            <button className="relative text-slate-500 hover:text-slate-700">
            <Bell size={20} />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
        </div>
        </div>
    );
}

export default TopBar;