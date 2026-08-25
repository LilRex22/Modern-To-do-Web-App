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
                    "http://localhost:8000/dashboard/all_tasks", 
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
        <div className="flex flex-col gap-8 p-10 ">
            {alltasks.map((task) => {

                return (
                    <div key={task.id} className="flex items-center gap-5 mt-1 rounded-2xl border border-slate-200 border-l-4 border-l-slate-200 bg-white p-5">
                        <div className="">
                            <img width="48" height="48" src="https://img.icons8.com/color/48/task--v1.png" alt="task--v1"/>
                        </div>
                        
                        <div className="">
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
                )
            })}
        </div>
    );
}

export default AllTask;