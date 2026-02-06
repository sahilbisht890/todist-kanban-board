import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  DoubleRightOutlined,
  PauseOutlined,
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import axiosInstance from "../../utils/axios";
import { Tooltip, Badge, Dropdown, Menu } from "antd";
import noData from "../../assets/no-data.svg";
import { MoreOutlined } from "@ant-design/icons";

const ListView = ({ tasks, handleFetchTaskList, onEdit, onDelete }) => {
  const [columns, setColumns] = useState({
    "To-Do": [],
    "In-Progress": [],
    Done: [],
  });

  useEffect(() => {
    setColumns({
      "To-Do": tasks.filter((task) => task.status === "to-do"),
      "In-Progress": tasks.filter((task) => task.status === "in-progress"),
      Done: tasks.filter((task) => task.status === "done"),
    });
  }, [tasks]);

  const updateTaskStatus = async (task, targetStatus) => {
    try {
      await axiosInstance.put(`/tasks/update?taskId=${task._id}`, {
        status: targetStatus.toLowerCase(),
      });
      handleFetchTaskList();
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {Object.keys(columns).map((status) => (
          <Column
            key={status}
            status={status}
            tasks={columns[status]}
            moveTask={moveTask}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </DndProvider>
  );
};

const Column = ({ status, tasks, moveTask, onEdit, onDelete }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item, status),
  });

  const statusConfig = {
    Done: {
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      countColor: "bg-green-200 text-green-800",
    },
    "To-Do": {
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      countColor: "bg-blue-200 text-blue-800",
    },
    "In-Progress": {
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-800",
      countColor: "bg-amber-200 text-amber-800",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      ref={drop}
      className={`p-4 border-2 rounded-xl ${config.bgColor} ${config.borderColor} min-h-[500px] overflow-auto max-h-[800px] transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-bold text-lg ${config.textColor}`}>{status}</h3>
        <div
          className={`
    inline-flex items-center justify-center
    min-w-[20px] h-[20px]
    px-1
    rounded-full
    text-xs font-semibold text-white
    ${config.countColor}
  `}
        >
          {tasks.length}
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col h-full items-center justify-center py-8">
          <img
            src={noData}
            alt="No Tasks"
            className="w-16 h-16 opacity-60 mb-3"
          />
          <p className="text-gray-400 text-sm">No tasks yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <DraggableTask
              key={task._id}
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

const DraggableTask = ({ task, onEdit, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const priorityConfig = {
    low: {
      icon: <DoubleRightOutlined className="rotate-90 text-blue-500" />,
      label: "Low",
      color: "text-blue-600 bg-blue-100",
    },
    high: {
      icon: <DoubleRightOutlined className="-rotate-90 text-red-500" />,
      label: "High",
      color: "text-red-600 bg-red-100",
    },
    medium: {
      icon: <PauseOutlined className="rotate-90 text-amber-500" />,
      label: "Medium",
      color: "text-amber-600 bg-amber-100",
    },
  };

  const priority = priorityConfig[task.priority];

  const menuItems = (
    <Menu
      items={[
        {
          key: "edit",
          label: "Edit",
          icon: <EditOutlined />,
          onClick: () => onEdit(task),
        },
        {
          key: "delete",
          label: "Delete",
          icon: <DeleteOutlined />,
          danger: true,
          onClick: () => onDelete(task),
        },
      ]}
    />
  );

  const isOverdue = dayjs(task.dueDate).isBefore(dayjs(), "day");

  return (
    <div
      ref={drag}
      className={`p-4 border rounded-lg bg-white cursor-grab transition-all duration-200 hover:shadow-md hover:border-blue-300 ${
        isDragging ? "opacity-50 rotate-2 shadow-xl" : "opacity-100"
      } ${isOverdue ? "border-red-200 bg-red-50" : "border-gray-200"}`}
    >
      {/* Header with title and actions */}
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-800 text-base line-clamp-2 flex-1 mr-2">
          {task.title}
        </h4>

        <Dropdown
          overlay={menuItems}
          trigger={["click"]}
          placement="bottomRight"
        >
          <MoreOutlined className="text-gray-400 hover:text-gray-600 cursor-pointer p-1" />
        </Dropdown>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Priority and Due Date */}
      <div className="flex items-center justify-between mb-3">
        <Badge
          className={`px-2 py-1 rounded-full text-xs font-medium ${priority.color}`}
        >
          <span className="flex items-center gap-1">
            {priority.icon}
            {priority.label}
          </span>
        </Badge>

        <Tooltip title={`Due: ${dayjs(task.dueDate).format("DD MMM, YYYY")}`}>
          <div
            className={`flex items-center gap-1 text-sm ${isOverdue ? "text-red-500" : "text-gray-500"}`}
          >
            <ClockCircleOutlined />
            <span>{dayjs(task.dueDate).format("DD MMM")}</span>
          </div>
        </Tooltip>
      </div>

      {/* Timestamps */}
      <div className="border-t border-gray-100 pt-2">
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div>
            <div className="font-medium">Created</div>
            <div>{dayjs(task.createdAt).format("DD MMM")}</div>
          </div>
          <div>
            <div className="font-medium">Updated</div>
            <div>{dayjs(task.updatedAt).format("DD MMM")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;
