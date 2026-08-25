import { Search, Bell } from "lucide-react";

function TopBar({ title, subtitle }) {
    return (
        <div className="border-b border-slate-200 px-4 py-3 sm:px-6 lg:px-10 lg:py-4">

            {/* Header */}
            <div className="flex items-center justify-between gap-4">

                {/* Title */}
                <div className="min-w-0">
                    <h1 className="truncate text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="mt-0.5 truncate text-xs text-slate-500 sm:text-sm">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Desktop Search + Notification */}
                <div className="hidden items-center gap-4 sm:flex">

                    <div className="relative">
                        <Search
                            size={16}
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="
                                w-48
                                rounded-full
                                border
                                border-slate-200
                                bg-white
                                py-2.5
                                pl-10
                                pr-4
                                text-sm
                                text-slate-600
                                outline-none
                                placeholder:text-slate-400
                                focus:border-indigo-400
                                lg:w-64
                            "
                        />
                    </div>

                    <button
                        className="
                            relative
                            shrink-0
                            text-slate-500
                            transition
                            hover:text-slate-700
                        "
                    >
                        <Bell size={20} />

                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
                    </button>

                </div>

                {/* Mobile Notification */}
                <button
                    className="
                        relative
                        shrink-0
                        text-slate-500
                        transition
                        hover:text-slate-700
                        sm:hidden
                    "
                >
                    <Bell size={20} />

                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
                </button>

            </div>

            {/* Mobile Search */}
            <div className="relative mt-3 sm:hidden">
                <Search
                    size={16}
                    className="
                        pointer-events-none
                        absolute
                        left-3.5
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                />

                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        py-2.5
                        pl-10
                        pr-4
                        text-sm
                        text-slate-600
                        outline-none
                        placeholder:text-slate-400
                        focus:border-indigo-400
                    "
                />
            </div>

        </div>
    );
}

export default TopBar;