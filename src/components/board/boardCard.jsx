import React from 'react';

const BoardCard = ({ board, onClick }) => {
  const { name, totalTasks, todoTasks, inProgressTasks, doneTasks } = board;
  
  const StatItem = ({ label, value }) => (
    <div className="flex flex-col">
      <div className="text-gray-600 text-sm font-medium text-nowrap">{label}</div>
      <div className="text-gray-800 font-bold text-lg">{value}</div>
    </div>
  );

  return (
    <div
      className="bg-white rounded-xl p-5 cursor-pointer border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 ease-in-out group"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300 truncate">
        {name}
      </h3>

      <div className="bg-gray-50 p-4 rounded-lg transition-colors duration-300 group-hover:bg-blue-50">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <StatItem label="Total Tasks" value={totalTasks} />
            <StatItem label="To Do" value={todoTasks} />
          </div>
          
          <div className="space-y-4">
            <StatItem label="In Progress" value={inProgressTasks} />
            <StatItem label="Done" value={doneTasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;