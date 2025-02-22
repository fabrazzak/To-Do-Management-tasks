import { useDraggable } from "@dnd-kit/core";
import React from "react";

const TaskCard = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task._id });

    const style = transform
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : undefined;

        // Format the timestamp to show only Year, Month, and Day
    const formattedTimestamp = new Date(task.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

  

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="card bg-base-100 shadow-lg cursor-grab p-4"
        >
            <div className="card-body">
                <h2 className="card-title">{task.title}</h2>
                <p>{task.description}</p>
                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    {/* Category */}
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                        {task.category}
                    </span>
                    
                    {/* Timestamp */}
                    <span className="text-xs sm:text-sm">{formattedTimestamp}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
