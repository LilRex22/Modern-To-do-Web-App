import { Plus, ChevronDown, Calendar, Clock, Briefcase, CheckSquare } from "lucide-react";
import { useState, useEffect } from "react";
import axios from 'axios';


function UpcomingView() {
    const [draft, setDraft] = useState("");
    const toggleTask = async (id, currentStatus) => {
        try {
            const token = localStorage.getItem('access');
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
    const [tasks, setTasks] = useState({
        overdue: [],
        today: [],
        tomorrow: [],
        this_week: [],
        next_week: [],
        later: [],
    });

    useEffect(()=>{
            const fetchTasks = async ()=> {
                try{
                    const token = localStorage.getItem('access');
                    const response = await axios.get('https://modern-to-do-web-app-api.onrender.com/dashboard/',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setTasks(response.data)
                    console.log(response.data)
                }catch(error){
                    console.log(error)
                }
            }
        fetchTasks()
    }, [])

    const upcomingGroups = [
        {
            key: "overdue",
            label: "OVERDUE",
            dot: "bg-red-600",
            tasks: tasks.overdue,
        },
        {
            key: "today",
            label: "TODAY",
            dot: "bg-indigo-600",
            tasks: tasks.today,
        },
        {
            key: "tomorrow",
            label: "TOMORROW",
            tasks: tasks.tomorrow,
        },
        {
            key: "this_week",
            label: "THIS WEEK",
            tasks: tasks.this_week,
        },
        {
            key: "next_week",
            label: "NEXT WEEK",
            tasks: tasks.next_week,
        },
        {
            key: "later",
            label: "LATER",
            tasks: tasks.later,
        },
    ];


    return (
        <div className="p-10">
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5">
            <Plus size={18} className="text-slate-400" />
            <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a task for upcoming days... (Press Enter)"
            className="flex-1 text-sm text-slate-600 outline-none placeholder:text-slate-400"
            />
            <button className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600">
            <Calendar size={14} />
            Date
            </button>
        </div>

        <div className="flex flex-col gap-8">
            {upcomingGroups.map((group) => {
            const canComplete = group.key === "overdue" || group.key === "today";

            return(
                <section key={group.key}>
                <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-slate-500">
                    {group.dot && <span className={`h-2 w-2 rounded-full ${group.dot}`} />}
                    {group.label}
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                    {group.tasks.length} {group.tasks.length === 1 ? "task" : "tasks"}
                </span>
                </div>

                <div className="flex flex-col gap-3">
                {group.tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`flex items-center gap-4 rounded-xl border border-slate-200 border-l-4 bg-white px-5 py-4`}
                        >
                        <button
                            onClick={canComplete ?() => toggleTask(task.id, task.Completed) : null}

                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                                task.Completed
                                    ? "border-indigo-600 bg-indigo-600 text-white"
                                    : "border-slate-300"
                            }`}
                        >
                            {task.Completed && <CheckSquare size={13} />}
                        </button>

                        <div>
                            <p className={`font-medium ${
                                task.Completed
                                    ? "text-slate-400 line-through"
                                    : "text-slate-900"
                            }`}>
                                {task.Title}
                            </p>

                            <p className={`mt-1 text-sm ${
                                task.Completed
                                    ? "text-slate-300 line-through"
                                    : "text-slate-500"
                            }`}>
                                {task.Description}
                            </p>

                            <div className="mt-1 flex items-center gap-4 text-sm">

                                <span className="flex items-center gap-1.5 font-medium text-slate-400">
                                    <Clock size={14} />
                                    {task.Time}
                                </span>

                                {task.Priority && (
                                    <span className={`font-medium ${
                                        task.Priority.toLowerCase() === "high"
                                            ? "text-red-500"
                                            : task.Priority.toLowerCase() === "medium"
                                            ? "text-yellow-500"
                                            : "text-green-500"
                                    }`}>
                                        {task.Priority}
                                    </span>
                                )}

                                {task.Category_name && (
                                    <span className="flex items-center gap-1.5 font-medium text-slate-400">
                                        <Briefcase size={14} />
                                        {task.Category_name}
                                    </span>
                                )}

                            </div>

                            <span className="mt-1.5 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                                Due - {task.Due_date}
                            </span>
                        </div>
                    </div>
                ))}
                </div>
            </section>
            )
            })}
        </div>

        <div className="mt-8 flex justify-center">
            <button className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700">
            Load More
            <ChevronDown size={16} />
            </button>
        </div>
        </div>
    );
}

export default UpcomingView;