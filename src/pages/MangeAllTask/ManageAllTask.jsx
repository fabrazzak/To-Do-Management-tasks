import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/authProvider/AuthProvider";
import axios from "axios";
import SingleTaskCard from "./SingleTaskCard";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageAllTask = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(AuthContext);
    const [selectedTask, setSelectedTask] = useState(null); // New state for selected task
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (user?.uid) {
            axios
                .get(`https://to-do-mangements.vercel.app/tasks?email=${user.uid}`)
                .then((res) => {
                    console.log("API Response:", res.data);
                    setTasks(res.data);
                })
                .catch((err) => console.error("Error fetching tasks:", err));
        }
    }, [user?.uid]);

    // Handle Delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your task has been deleted.",
                    icon: "success"
                });
                axios
                    .delete(`https://to-do-mangements.vercel.app/tasks/${id}`)
                    .then((res) => {
                        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
                    })
                    .catch((err) => console.error("Error deleting task:", err));
            }
        });
    };

    // Handle Edit
    const handleEdit = (task) => {
        setSelectedTask(task); // Set the selected task
        setTitle(task.title); // Set form fields with current task values
        setDescription(task.description);
        document.getElementById("my_modal_3").showModal(); // Open the modal
    };

    // Handle form submit (update task)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedTask = {
            title,
            description,
        };

        try {
            const response = await axios.put(`https://to-do-mangements.vercel.app/tasks/${selectedTask._id}`, updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === selectedTask._id ? { ...task, ...updatedTask } : task
                )
            );
            setTitle("");
            setDescription("");
            setSelectedTask(null); // Clear the selected task after saving
            document.getElementById("my_modal_3").close(); // Close the modal
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">All Tasks ({tasks.length})</h2>
                <Helmet>
                    <title> All Task | To Do Task Management</title>
                </Helmet>
                {/* Task List */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {tasks.length === 0 ? (
                        <p className="col-span-full text-center text-xl text-gray-500">No tasks available.</p>
                    ) : (
                        tasks.map((task) => (
                            <SingleTaskCard
                                key={task._id}
                                task={task}
                                onDelete={handleDelete}
                                onEdit={() => handleEdit(task)} // Pass the task to the edit handler
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Modal for editing task */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md mx-auto mt-5">
                        <h2 className="text-xl font-semibold mb-4 text-center">Edit Task</h2>
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Task Title"
                                value={title} // Set the value to the state
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                maxLength={50}
                                className="input input-bordered w-full mb-3"
                            />
                        </div>
                        <div className="form-control">
                            <textarea
                                placeholder="Task Description"
                                value={description} // Set the value to the state
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                maxLength={200}
                                className="textarea textarea-bordered w-full mb-3"
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-block btn-primary">Update Task</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ManageAllTask;
