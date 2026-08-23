import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import MessageBox from "./message";

function AddTask({ onClose }) {
    const [message, setMessage] = useState(null)
    const [formData, setFormData] = useState({
        Title: "",
        Description: "",
        Due_date: "",
        Time: "",
        Priority: "Low",
        Category: "Work"
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/dashboard/create_task', formData
                // {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // }
                )
            console.log(response)
            console.log(formData)
            setMessage({
                text: "Classroom added successfully!",
                type: "success"
            });

            // clear the form
            setFormData({
                Title: "",
                Description: "",
                Due_date: "",
                Time: "",
                Priority: "High",
                Category: "Work"
            })
        }catch(err){
            console.log(err.response.data)
            console.log(formData)
            setMessage({
                text: err.response.data.Title || "An error occurred while adding the task.",
                type: "error"
            });
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
            {message && (
                <MessageBox
                    message={message.text}
                    type={message.type}
                    onClose={() => setMessage(null)}
                />
            )}
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                    <h2 className="text-lg font-bold text-slate-900">Add New Task</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col gap-5 px-6 py-5">
                <div>
                    <label className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500">
                    TASK TITLE
                    </label>
                    <input
                    name = 'Title'
                    onChange={handleChange}
                    type="text"
                    placeholder="What needs to be done?"
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500">
                    DESCRIPTION
                    </label>
                    <textarea
                    onChange={handleChange}
                    name="Description"
                    rows={3}
                    placeholder="Add more details..."
                    className="w-full resize-none rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500">
                        DUE DATE
                    </label>
                    <input
                        onChange={handleChange}
                        name="Due_date"
                        type="date"
                        className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400"
                    />
                    </div>
                    <div>
                    <label className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500">
                        TIME
                    </label>
                    <input
                        onChange={handleChange}
                        name="Time"
                        type="time"
                        className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400"
                    />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500">
                            PRIORITY
                        </label>
                        <select
                            name="Priority"
                            value={formData.Priority}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400"
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                    <div>
                    <label className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500">
                        CATEGORY
                    </label>
                    <select
                        name="Category"
                        value={formData.Category}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400"
                    >
                        <option value='1'>Work</option>
                        <option value='2'>Personal</option>
                        <option value='3'>Study</option>
                    </select>
                    </div>
                </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
                <button
                    onClick={onClose}
                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                    Cancel
                </button>
                <button onClick={handleSubmit} className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                    Create Task
                </button>
                </div>
            </div>
        </div>
    );
}

export default AddTask;