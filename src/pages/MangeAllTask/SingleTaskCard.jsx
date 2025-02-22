


import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";  // Import React Icons

const SingleTaskCard = ({ task, onDelete, onEdit }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task._id });

    const style = transform
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : undefined;

    // Format the timestamp (YYYY-MM-DD)
    const formattedTimestamp = new Date(task.timestamp).toISOString().split("T")[0];
    return (
        <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="bg-white shadow-lg rounded-xl p-5 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer border border-gray-200"
    >
        {/* Task Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h2>

        {/* Task Description */}
        <p className="text-gray-600 text-sm mb-4">{task.description}</p>

        {/* Buttons for Edit and Delete */}
        <div className="flex justify-between items-center mb-3">
            {/* Category */}
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                {task.category}
            </span>
            
            {/* Edit and Delete Buttons */}
            <div className="flex space-x-3">
                <button
                    onClick={() => onEdit(task._id)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    <FaEdit size={18} />
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="text-red-500 hover:text-red-700"
                >
                    <FaTrash size={18} />
                </button>
            </div>
        </div>

        {/* Timestamp */}
        <span className="text-xs text-gray-500">{formattedTimestamp}</span>
    </div>
    );
};

export default SingleTaskCard;

