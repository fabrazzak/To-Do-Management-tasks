import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AuthContext } from "../../components/authProvider/AuthProvider"; // Ensure correct import path

const initialTask = [
    {
      _id: "67b79a9b813ba4ee464bff5f",
      title: "adf",
      description: "asdf",
      category: "to-do",
      userID: "FmorXe1mNEVSRjkF2jbM9Sk5gXC3",
      timestamp: "2025-02-20T21:11:55.310Z"
    },
    {
      _id: "67b79ab0813ba4ee464bff60",
      title: "sdf",
      description: "sfdf",
      category: "in-progress",
      userID: "FmorXe1mNEVSRjkF2jbM9Sk5gXC3",
      timestamp: "2025-02-20T21:12:16.751Z"
    },
    {
      _id: "67b79b839ee906358422c811",
      title: "sdf",
      description: "sfd",
      category: "to-do",
      userID: "FmorXe1mNEVSRjkF2jbM9Sk5gXC3",
      timestamp: "2025-02-20T21:15:46.998Z"
    },
    {
      _id: "67b79b8c9ee906358422c812",
      title: "dfs",
      description: "sdf",
      category: "done",
      userID: "FmorXe1mNEVSRjkF2jbM9Sk5gXC3",
      timestamp: "2025-02-20T21:15:56.309Z"
    },
    {
      _id: "67b79ba19ee906358422c813",
      title: "sdf",
      description: "sf",
      category: "to-do",
      userID: "FmorXe1mNEVSRjkF2jbM9Sk5gXC3",
      timestamp: "2025-02-20T21:16:17.422Z"
    },
    {
      _id: "67b79bb59ee906358422c814",
      title: "new task",
      description: "this is a new task",
      category: "in-progress",
      userID: "FmorXe1mNEVSRjkF2jbM9Sk5gXC3",
      timestamp: "2025-02-20T21:17:30.123Z"
    }
  ];

  const columns=[
    {
         id:"to-do",title:"To do"
    },{

         id:"in-progress",title:"In Progress"
    },{

         id:"done",title:"Done"
    }
]
const HomePage = () => {

    const [tasks, setTasks] = useState([...initialTask]);
   
     
      
      
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // useEffect(() => {
    //     if (user?.uid) {
    //         axios.get(`http://localhost:5000/tasks?email=${user.uid}`)
    //             .then((res) => setTasks(res.data))
    //             .catch((err) => console.error("Error fetching tasks:", err));
    //     }
    // }, [user?.uid]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = {
            title,
            description,
            category: "To-Do",
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await axios.post("http://localhost:5000/tasks", newTask);
            setTasks((prevTasks) => [...prevTasks, response.data]);
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        movedTask.category = result.destination.droppableId;
        updatedTasks.splice(result.destination.index, 0, movedTask);

        setTasks(updatedTasks);

        try {
            await axios.put(`http://localhost:5000/tasks/${movedTask._id}`, { category: movedTask.category });
        } catch (error) {
            console.error("Error updating task:", error);
        } 
    };

    return (
        <div className="min-h-screen bg-base-200 text-base-content p-6">          

            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">📌 Task Board</h2>

                <button onClick={() => document.getElementById("my_modal_3").showModal()} className="btn btn-neutral">
                    Add Task
                </button>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="grid md:grid-cols-3 gap-6">
                        {columns.map((column) => (
                            <Droppable key={column?.id} droppableId={column?.id}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="p-4 bg-base-300 rounded-lg shadow-lg"
                                    >
                                        <h3 className="text-xl font-semibold mb-4">{column?.title}</h3>
                                        <div className="space-y-3">
                                            {tasks
                                                .filter((task) => task.column?.id === column.id)
                                                .map((task, index) => (
                                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="card bg-base-100 shadow-lg cursor-grab"
                                                            >
                                                                <div className="card-body">
                                                                    <h2 className="card-title">{task.title}</h2>
                                                                    <p>{task.description}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            </div>

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
