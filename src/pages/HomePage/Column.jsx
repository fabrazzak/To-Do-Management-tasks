import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard"; // Import the TaskCard component

const Column = ({ column, tasks }) => {
    const { isOver, setNodeRef } = useDroppable({ id: column.id });

    return (
        <div ref={setNodeRef} className={`p-4 bg-base-300 rounded-lg shadow-lg ${isOver ? "ring-2 ring-blue-500" : ""}`}>
            <h3 className="text-2xl font-semibold mb-4">{column.title}</h3>
            <div className="space-y-3">
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                    />
                ))}
            </div>
        </div>
    );
};

export default Column;
