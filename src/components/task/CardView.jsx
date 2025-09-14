import React from "react";
import TaskCard from "./TaskCard";

const CardView = ({ tasks, onEdit, onDelete, onCreateTask }) => {
  return (
    <div className="w-full px-2 sm:px-4 md:px-6">
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
    </div>
  );
};

export default CardView;
