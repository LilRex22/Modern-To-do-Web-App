import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./navbar";
import { useState } from "react";
import AddTask from "./addTask";
import TopBar from "./topbar";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Layout() {
    const [showModal, setShowModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();


     // Get logged-in user
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("access");
                const response = await axios.get(
                    "http://localhost:8000/api/current_user/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(response.data);

            } catch (error) {
                console.log("Failed to fetch user:", error);
            }
        };
        fetchUser();
    }, []);
    
    // Get greeting based on current time
    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) {
            return "Good morning";
        } else if (hour < 18) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    };


    const titles = {
        "/dashboard/today": `${getGreeting()}, ${user?.username || "User"}`,
        "/dashboard/upcoming": "Upcoming",
        "/dashboard/all": "All Tasks",
        "/dashboard/completed": "Completed",
    };

    const subtitles = {
        "/dashboard/today": "Here's what's on your plate today.",
        "/dashboard/upcoming": "View all your upcoming tasks.",
        "/dashboard/all": "Here are all your available tasks.",
        "/dashboard/completed": "View all your completed tasks.",
    };

    const title = titles[location.pathname] || "TaskFlow";
    const subtitle = subtitles[location.pathname] || "";

    const handleTaskCreated = () => {
        setRefreshKey(prev => prev + 1);
        setShowModal(false);
        navigate("/dashboard/today");
    };

    return (
        <>
            <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900">
                <Sidebar onAddTask={() => setShowModal(true)} />

                <main className="flex-1 overflow-y-auto pb-24 lg:pb-0">
                    <TopBar title={title} subtitle={subtitle} />
                    <Outlet context={{ refreshKey }}/>
                </main>

                {showModal && (
                    <AddTask
                        onClose={() => setShowModal(false)}
                        onTaskCreated={handleTaskCreated}
                    />
                )}
            </div>
        </>
    );
}

export default Layout;