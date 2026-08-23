import { useState } from "react";
import Sidebar from "../components/navbar";
import AddTask from "../components/addTask"; 
import TodayView from "./todayTask";
import TopBar from "../components/topbar";
import UpcomingView from "./upcomingTask";
import AllTask from "./allTask";
import CompletedTask from "./completedTask";


function Dashboard() {
    const [view, setView] = useState("today");
    const [showModal, setShowModal] = useState(false);

    const titles = {
        today: { title: "Good morning, Alex" },
        upcoming: { title: "Upcoming" },
        all: { title: "All Tasks" },
        completed: { title: "Completed" },
    };

    return (
        <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900">
        <Sidebar view={view} setView={setView} onAddTask={() => setShowModal(true)} />

        <main className="flex-1 overflow-y-auto">
            {view === "today" ? (
            <>
                <div className="px-10 pt-8">
                <h1 className="text-3xl font-bold text-slate-900">Good morning, Alex</h1>
                </div>
                <TodayView />
            </>
            ) : (
            <>
                <TopBar title={titles[view]?.title ?? "Tasks"} />
                {view === "upcoming" && <UpcomingView />}
                {view === "all" && <AllTask />}
                {view === "completed" && <CompletedTask />}
            </>
            )}
        </main>

        {showModal && <AddTask onClose={() => setShowModal(false)} />}
        </div>
    );
}

export default Dashboard;