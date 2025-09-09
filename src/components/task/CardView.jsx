import React from "react";
import TaskCard from "./TaskCard";
import noData from "../../assets/no-data.svg"

const CardView = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <img
            src={noData}
            alt="No Data"
            className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56"
          />
          <p className="text-gray-500  font-bold text-lg sm:text-xl lg:text-2xl">
            No Task Available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardView;
