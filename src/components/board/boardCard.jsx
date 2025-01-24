import React from "react";

const BoardCard = ({ board, onClick }) => {
  return (
    <div
      className="bg-red-200 cardShadow rounded-lg p-4 cursor-pointer hover:bg-gradient-to-r hover:from-red-300 hover:to-red-400 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 transition-colors duration-300 hover:text-white">
        {board.name}
      </h3>

      <div className="bg-red-100 flex flex-col sm:flex-row justify-between gap-4 p-4 rounded-lg transition-colors duration-300 hover:bg-red-200">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row md:flex-col">
            <div className="text-gray-600 font-semibold">Total Tasks : </div>
            <div className="text-gray-800 font-bold">{board.totalTasks}</div>
          </div>
          <div className="flex flex-row md:flex-col ">
            <div className="text-gray-600 font-semibold ">To Do : </div>
            <div className="text-gray-800 font-bold">{board.todoTasks}</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row md:flex-col">
            <div className="text-gray-600 font-semibold">In Progress : </div>
            <div className="text-gray-800 font-bold">
              {board.inProgressTasks}
            </div>
          </div>
          <div className="flex flex-row md:flex-col">
            <div className="text-gray-600 font-semibold">Done Task : </div>
            <div className="text-gray-800 font-bold">{board.doneTasks}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
