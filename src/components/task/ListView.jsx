import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DoubleRightOutlined, PauseOutlined } from "@ant-design/icons";
import { IconClockFilled } from "@tabler/icons-react";
import dayjs from "dayjs";
import axiosInstance from "../../utils/axios";

const ListView = ({ tasks, handleFetchTaskList }) => {
  const [columns, setColumns] = useState({
    "To-Do": tasks.filter((task) => task.status === "to-do"),
    "In-Progress": tasks.filter((task) => task.status === "in-progress"),
    Done: tasks.filter((task) => task.status === "done"),
  });

  const updateTaskStatus = async (task, targetStatus) => {
    try {
      const response = await axiosInstance.put(
        `/tasks/update?taskId=${task._id}`,
        { status: targetStatus.toLowerCase() }
      );
      handleFetchTaskList();
      console.log("Updated Successfully");
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const moveTask = (task, targetStatus) => {
    setColumns((prev) => {
      const keywordsStatus = {
        done: "Done",
        "to-do": "To-Do",
        "in-progress": "In-Progress",
      };
      const sourceStatus = keywordsStatus[task.status];

      if (!prev[sourceStatus] || !prev[targetStatus]) {
        console.error("Invalid status provided:", sourceStatus, targetStatus);
        return prev;
      }

      return {
        ...prev,
        [sourceStatus]: prev[sourceStatus].filter((t) => t._id !== task._id),
        [targetStatus]: [
          ...prev[targetStatus],
          { ...task, status: targetStatus },
        ],
      };
    });

    updateTaskStatus(task, targetStatus);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(columns).map((status) => (
          <Column
            key={status}
            status={status}
            tasks={columns[status]}
            moveTask={moveTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};

const Column = ({ status, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item, status),
  });

  const bgColor = {
    Done: "bg-green-200",
    "To-Do": "bg-blue-200",
    "In-Progress": "bg-yellow-200",
  };
  const headingColor = {
    Done: "text-green-700",
    "To-Do": "text-blue-700",
    "In-Progress": "text-yellow-700",
  };

  return (
    <div
      ref={drop}
      className={`p-4 border rounded shadow-md min-h-[400px] ${bgColor[status]}`}
    >
      <h3 className={`font-bold text-lg ${headingColor[status]} mb-4`}>
        {status}
      </h3>
      {tasks.length === 0 ? (
        <div className="flex flex-col h-fit items-center justify-center">
          <img
            src="/images/no-data.svg"
            alt="No Data"
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
          />
          <p className="text-gray-500 mt-2 text-sm sm:text-base lg:text-lg">
            No Tasks
          </p>
        </div>
      ) : (
        tasks.map((task) => <DraggableTask key={task._id} task={task} />)
      )}
    </div>
  );
};

const DraggableTask = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const priorityIcons = {
    low: <DoubleRightOutlined className="rotate-90 text-blue-600 text-xl" />,
    high: <DoubleRightOutlined className="-rotate-90 text-red-600 text-xl" />,
    medium: <PauseOutlined className="rotate-90 text-yellow-600 text-xl" />,
  };

  return (
    <div
      ref={drag}
      className={`p-4 border rounded  bg-white mb-2 cardShadow ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-red-700 text-sm md:text-base">
          {task.title}
        </h4>
        <div>{priorityIcons[task.priority]}</div>
      </div>
      <p className="text-xs md:text-sm text-gray-600">{task.description}</p>
      <div className="flex items-start md:items-center flex-col md:flex-row gap-0 md:gap-2  mt-1">
        <span className={`font-bold text-sm text-gray-600`}>Updated at :</span>{" "}
        <div className={`flex items-center gap-1`}>
          <div className={`text-sm font-semibold text-gray-700`}>
            {dayjs(task.updatedAt).format("DD MMM, YYYY [at] hh:mm A")}
          </div>
        </div>
      </div>
      <div className="flex items-start md:items-center flex-col md:flex-row  gap-0 md:gap-2">
        <span className={`font-bold text-sm text-gray-600`}>Created at :</span>{" "}
        <div className={`flex items-center gap-1`}>
          <div className={`text-sm font-semibold text-gray-700 `}>
            {dayjs(task.createdAt).format("DD MMM, YYYY [at] hh:mm A")}
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-end mt-2">
        <IconClockFilled size={18} className="text-gray-700" />{" "}
        <div className="text-sm">
          {dayjs(task.dueDate).format("DD MMM, YYYY")}
        </div>
      </div>
    </div>
  );
};

export default ListView;
