import { useState, useEffect } from "react";
import { Clock, Briefcase } from "lucide-react";
import axios from "axios";

function AllTask() {
    const [alltasks, setAllTasks] = useState([]);

    useEffect(() => {
    const fetchTasks = async () => {
        try {
                const token = localStorage.getItem('access');
                const response = await axios.get(
                    "https://modern-to-do-web-app-api.onrender.com/dashboard/all_tasks", 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAllTasks(response.data);
                console.log("ALL TASKS:", response.data);
            } catch (err) {
                console.log("Error fetching tasks:", err);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div className="flex min-w-0 flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:gap-8 lg:p-10">
            {alltasks.map((task) => {

                return (
                    <div key={task.id} className="mt-1 flex items-start gap-3 rounded-2xl border border-slate-200 border-l-4 border-l-slate-200 bg-white p-4 sm:gap-4 sm:p-5">
                        <div className="shrink-0">
                            <img width="48" height="48" src="https://img.icons8.com/color/48/task--v1.png" alt="task--v1"/>
                        </div>
                        
                        <div className="min-w-0 flex-1">
                            <p className={`font-medium ${
                            task.Completed
                                ? "text-slate-400 line-through"
                                    : "text-slate-900"
                            }`}>
                                {task.Title}
                            </p>

                            <p className={`mt-1 wrap-break-word text-sm ${
                                task.Completed
                                    ? "text-slate-300 line-through"
                                    : "text-slate-500"
                            }`}>
                                {task.Description}
                            </p>

                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">

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
                )
            })}
        </div>
    );
}

export default AllTask;