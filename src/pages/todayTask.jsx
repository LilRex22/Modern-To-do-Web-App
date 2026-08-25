import {
    CheckSquare,
    ClipboardList,
    CheckCircle2,
    MoreVertical,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

function TodayView() {
    const { refreshKey } = useOutletContext();

    const [tasks, setTasks] = useState({
        overdue: [],
        today: [],
        tomorrow: [],
        this_week: [],
        next_week: [],
        later: [],
        Completed: [],
    });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("access");

                const response = await axios.get(
                    "https://modern-to-do-web-app-api.onrender.com/dashboard/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setTasks(response.data);
                console.log(response.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchTasks();
    }, [refreshKey]);

    const toggleTask = async (id, currentStatus) => {
        try {
            const token = localStorage.getItem("access");

            await axios.patch(
                "https://modern-to-do-web-app-api.onrender.com/dashboard/",
                {
                    id: id,
                    Completed: !currentStatus,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const response = await axios.get(
                "https://modern-to-do-web-app-api.onrender.com/dashboard/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTasks(response.data);

        } catch (error) {
            console.log("Error updating task:", error);
        }
    };

    const total = tasks.today.length;
    const completed = tasks.today.filter(
        (t) => t.Completed
    ).length;

    const remaining = total - completed;

    const stats = [
        {
            label: "TOTAL TASKS",
            value: total,
            unit: "tasks",
            icon: ClipboardList,
            color: "text-slate-900",
        },
        {
            label: "COMPLETED",
            value: completed,
            unit: "done",
            icon: CheckCircle2,
            color: "text-emerald-600",
            bg: "bg-indigo-50",
        },
        {
            label: "REMAINING",
            value: remaining,
            unit: "to go",
            icon: ClipboardList,
            color: "text-indigo-600",
        },
    ];

    // Sort today's tasks according to due time
    const sortedTodayTasks = [...tasks.today].sort((a, b) => {
        const dateTimeA = new Date(
            `${a.Due_date}T${a.Time}`
        );

        const dateTimeB = new Date(
            `${b.Due_date}T${b.Time}`
        );

        return dateTimeA - dateTimeB;
    });

    return (
        <div className="min-w-0 p-4 sm:p-6 lg:p-10">

            {/* Date */}
            <p className="text-sm text-slate-400">
                {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                })}
            </p>

            {/* Statistics */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-3 lg:gap-5">

                {stats.map((s) => {
                    const Icon = s.icon;

                    return (
                        <div
                            key={s.label}
                            className={`rounded-2xl border border-slate-200 p-4 sm:p-5 ${
                                s.bg ?? "bg-white"
                            }`}
                        >

                            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500">
                                <Icon size={14} />
                                {s.label}
                            </div>

                            <p
                                className={`mt-2 text-3xl font-extrabold sm:mt-3 sm:text-4xl ${s.color}`}
                            >
                                {s.value}
                            </p>

                            <p className="text-sm text-slate-400">
                                {s.unit}
                            </p>

                        </div>
                    );
                })}

            </div>

            {/* Today's Tasks */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:mt-6">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">

                    <h2 className="text-lg font-bold text-slate-900">
                        Today
                    </h2>

                    <button className="shrink-0 text-slate-400 transition hover:text-slate-600">
                        <ClipboardList size={18} />
                    </button>

                </div>

                {/* Tasks */}
                <ul>

                    {tasks.today.length === 0 ? (

                        <li className="px-4 py-8 text-center text-sm text-slate-400 sm:px-6">
                            No tasks for today.
                        </li>

                    ) : (

                        sortedTodayTasks.map((task) => (

                            <li
                                key={task.id}
                                className="
                                    flex
                                    items-start
                                    gap-3
                                    border-b
                                    border-slate-100
                                    px-4
                                    py-4
                                    last:border-b-0
                                    sm:gap-4
                                    sm:px-6
                                "
                            >

                                {/* Checkbox */}
                                <button
                                    onClick={() =>
                                        toggleTask(
                                            task.id,
                                            task.Completed
                                        )
                                    }
                                    className={`
                                        mt-0.5
                                        flex
                                        h-5
                                        w-5
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded
                                        border
                                        ${
                                            task.Completed
                                                ? "border-indigo-600 bg-indigo-600 text-white"
                                                : "border-slate-300"
                                        }
                                    `}
                                >
                                    {task.Completed && (
                                        <CheckSquare size={13} />
                                    )}
                                </button>

                                {/* Task Content */}
                                <div className="min-w-0 flex-1">

                                    {/* Title + Priority */}
                                    <div className="flex min-w-0 flex-wrap items-center gap-2">

                                        <p
                                            className={`
                                                min-w-0
                                                wrap-break-word
                                                font-medium
                                                ${
                                                    task.Completed
                                                        ? "text-slate-400 line-through"
                                                        : "text-slate-900"
                                                }
                                            `}
                                        >
                                            {task.Title}
                                        </p>

                                        {task.Priority && (
                                            <span
                                                className={`
                                                    shrink-0
                                                    rounded-full
                                                    px-2
                                                    py-0.5
                                                    text-[11px]
                                                    font-semibold
                                                    ${
                                                        task.Priority.toLowerCase() ===
                                                        "high"
                                                            ? "bg-red-100 text-red-600"
                                                            : task.Priority.toLowerCase() ===
                                                              "medium"
                                                            ? "bg-yellow-100 text-yellow-600"
                                                            : "bg-green-100 text-green-600"
                                                    }
                                                `}
                                            >
                                                {task.Priority}
                                            </span>
                                        )}

                                    </div>

                                    {/* Description */}
                                    <p
                                        className={`
                                            mt-0.5
                                            wrap-break-word
                                            text-sm
                                            ${
                                                task.Completed
                                                    ? "text-slate-300 line-through"
                                                    : "text-slate-500"
                                            }
                                        `}
                                    >
                                        {task.Description}
                                    </p>

                                    {/* Metadata */}
                                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">

                                        <span className="whitespace-nowrap">
                                            📅 {task.Due_date}
                                        </span>

                                        <span className="whitespace-nowrap">
                                            🕐 {task.Time}
                                        </span>

                                        {task.Category_name && (
                                            <span className="max-w-full wrap-break-word">
                                                🏷️ {task.Category_name}
                                            </span>
                                        )}

                                    </div>

                                </div>

                                {/* More Button */}
                                <button className="mt-0.5 shrink-0 text-slate-300 transition hover:text-slate-500">
                                    <MoreVertical size={18} />
                                </button>

                            </li>

                        ))
                    )}

                </ul>

            </div>

        </div>
    );
}

export default TodayView;