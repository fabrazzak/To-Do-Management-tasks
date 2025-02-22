import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../components/authProvider/AuthProvider";
import Column from "./Column";
import { DndContext } from "@dnd-kit/core";
import { Helmet } from "react-helmet-async";

const columns = [
    { id: "to-do", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" }
];

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (user?.uid) {
            axios.get(`https://to-do-mangements.vercel.app/tasks?email=${user.uid}`)
                .then((res) => {
                    console.log("API Response:", res.data);  // Debugging
                    setTasks(res.data);
                })
                .catch((err) => console.error("Error fetching tasks:", err));
        }
    }, [user?.uid]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = {
            title,
            description,
            category: "to-do",  // Fixed default category
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await axios.post("https://to-do-mangements.vercel.app/tasks", newTask);
            setTasks((prevTasks) => [...prevTasks, response.data]);
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id;
        const newCategory = over.id;

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === taskId ? { ...task, category: newCategory } : task
            )
        );

        try {
            await axios.put(`https://to-do-mangements.vercel.app/tasks/${taskId}`, { category: newCategory });
        } catch (error) {
            console.error("Error updating task category:", error);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 text-base-content p-6">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center ">📌 Task Board</h2>
                <button onClick={() => document.getElementById("my_modal_3").showModal()} className="btn btn-neutral my-6">
                    Add Task
                </button>

                <Helmet>
                    <title> Home | To Do Task Management</title>
                </Helmet>


                <div className="grid md:grid-cols-3 gap-6">
                    <DndContext onDragEnd={handleDragEnd}>
                        {columns.length > 0 ? (
                            columns.map((column) => {
                                const filteredTasks = tasks.filter((task) => task.category === column.id);

                                return (
                                    <Column
                                        key={column.id}
                                        column={column}
                                        tasks={filteredTasks}
                                    />
                                );
                            })
                        ) : (
                            <p>Loading columns...</p>
                        )}
                    </DndContext>
                </div>
            </div>

            {/* Task Modal */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md mx-auto mt-5">
                        <h2 className="text-xl font-semibold mb-4 text-center">Add a New Task</h2>
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Task Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                maxLength={50}
                                className="input input-bordered w-full mb-3"
                            />
                        </div>
                        <div className="form-control">
                            <textarea
                                placeholder="Task Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                maxLength={200}
                                className="textarea textarea-bordered w-full mb-3"
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-block btn-primary">Add Task</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default HomePage;
