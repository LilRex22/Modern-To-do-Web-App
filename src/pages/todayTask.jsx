import { CheckSquare, ClipboardList, CheckCircle2, MoreVertical, } from "lucide-react";
import { useState, useEffect } from "react";
import axios from 'axios';

function TodayView() {
    const [tasks, setTasks] = useState({
        overdue: [],
        today: [],
        tomorrow: [],
        this_week: [],
        next_week: [],
        later: [],
        Completed: [],
    });

    useEffect(()=>{
        const fetchTasks = async ()=> {
            try{
                const response = await axios.get('http://localhost:8000/dashboard/')
                setTasks(response.data)
                console.log(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchTasks()
    }, [])

    const toggleTask = async (id, currentStatus) => {
        try {
            await axios.patch(
                "http://localhost:8000/dashboard/",
                {
                    id: id,
                    Completed: !currentStatus,
                }
            );

            const response = await axios.get(
                "http://localhost:8000/dashboard/"
            );

            setTasks(response.data);

        } catch (error) {
            console.log("Error updating task:", error);
        }
    };

    const total = tasks.today.length;
    const completed = tasks.today.filter((t) => t.Completed).length;
    const remaining = total - completed;

    const stats = [
        { label: "TOTAL TASKS", value: total, unit: "tasks", icon: ClipboardList, color: "text-slate-900" },
        { label: "COMPLETED", value: completed, unit: "done", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-indigo-50" },
        { label: "REMAINING", value: remaining, unit: "to go", icon: ClipboardList, color: "text-indigo-600" },
    ];

    return (
        <div className="p-10">

            <p className="text-sm text-slate-400">
                {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                })}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-5">
                {stats.map((s) => {
                    const Icon = s.icon;

                    return (
                        <div
                            key={s.label}
                            className={`rounded-2xl border border-slate-200 p-5 ${
                                s.bg ?? "bg-white"
                            }`}
                        >
                            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500">
                                <Icon size={14} />
                                {s.label}
                            </div>

                            <p
                                className={`mt-3 text-4xl font-extrabold ${s.color}`}
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

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white">

                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                    <h2 className="text-lg font-bold text-slate-900">
                        Today
                    </h2>

                    <button className="text-slate-400 hover:text-slate-600">
                        <ClipboardList size={18} />
                    </button>
                </div>

                <ul>
                    {tasks.today.length === 0 ? (
                        <li className="px-6 py-8 text-center text-sm text-slate-400">
                            No tasks for today.
                        </li>
                    ) : (
                        tasks.today.map((task) => (
                            <li
                                key={task.id}
                                className="flex items-start gap-4 border-b border-slate-100 px-6 py-4 last:border-b-0"
                            >

                                <button
                                    onClick={() => toggleTask(task.id, task.Completed)}
                                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                                        task.Completed
                                            ? "border-indigo-600 bg-indigo-600 text-white"
                                            : "border-slate-300"
                                    }`}
                                >
                                    {task.Completed && (
                                        <CheckSquare size={13} />
                                    )}
                                </button>

                                <div className="flex-1">

                                    <div className="flex items-center gap-2">
                                        <p
                                            className={`font-medium ${
                                                task.Completed
                                                    ? "text-slate-400 line-through"
                                                    : "text-slate-900"
                                            }`}
                                        >
                                            {task.Title}
                                        </p>

                                        {task.Priority && (
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                                    task.Priority.toLowerCase() === "high"
                                                        ? "bg-red-100 text-red-600"
                                                        : task.Priority.toLowerCase() === "medium"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-green-100 text-green-600"
                                                }`}
                                            >
                                                {task.Priority}
                                            </span>
                                        )}
                                    </div>

                                    <p
                                        className={`mt-0.5 text-sm ${
                                            task.Completed
                                                ? "text-slate-300 line-through"
                                                : "text-slate-500"
                                        }`}
                                    >
                                        {task.Description}
                                    </p>

                                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">

                                        <span>
                                            📅 {task.Due_date}
                                        </span>

                                        <span>
                                            🕐 {task.Time}
                                        </span>

                                        {task.Category_name && (
                                            <span>
                                                🏷️{" "}
                                                {task.Category_name}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <button className="text-slate-300 hover:text-slate-500">
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