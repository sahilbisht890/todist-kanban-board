import React from "react";
import {
  IconClockFilled,
  IconListNumbers,
  IconProgressBolt,
  IconCircleCheckFilled,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { DoubleRightOutlined, PauseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Tooltip } from "antd";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const priorityColor = {
    low: "text-blue-600",
    high: "text-rose-600",
    medium: "text-amber-600",
  };

  const statusColor = {
    "to-do": "text-blue-700",
    "in-progress": "text-amber-700",
    done: "text-green-700",
  };

  const priorityIcons = {
    low: <DoubleRightOutlined className="rotate-90 text-blue-600 text-base" />,
    high: <DoubleRightOutlined className="-rotate-90 text-rose-600 text-base" />,
    medium: <PauseOutlined className="rotate-90 text-amber-600 text-base" />,
  };

  const statusIcons = {
    "to-do": <IconListNumbers className="text-blue-600" size={20} />,
    done: <IconCircleCheckFilled className="text-green-600" size={20} />,
    "in-progress": <IconProgressBolt className="text-amber-600" size={20} />,
  };

  const keywordsStatus = {
    done: "Done",
    "to-do": "To-Do",
    "in-progress": "In-Progress",
  };

  return (
    <div className="p-5 rounded-xl bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-3 gap-2">
        <Tooltip title="Due Date">
          <div className="flex items-center gap-2">
            <IconClockFilled size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-600">
              {dayjs(task.dueDate).format("DD MMM, YYYY")}
            </span>
          </div>
        </Tooltip>

        <div className="flex items-center gap-3">
          <IconEdit
            size={20}
            className="text-blue-600 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => onEdit(task)}
          />
          <IconTrash
            size={20}
            className="text-rose-600 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => onDelete(task)}
          />
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="font-semibold text-lg text-gray-800 mb-1 break-words">
        {task.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 break-words line-clamp-4">
        {task.description}
      </p>

      {/* Priority */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="font-medium text-sm text-gray-500">Priority:</span>
        <div className="flex items-center gap-1">
          {priorityIcons[task.priority]}
          <span
            className={`${priorityColor[task.priority]} text-sm font-semibold capitalize`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="font-medium text-sm text-gray-500">Status:</span>
        <div className="flex items-center gap-1">
          {statusIcons[task.status]}
          <span className={`${statusColor[task.status]} text-sm font-semibold`}>
            {keywordsStatus[task.status]}
          </span>
        </div>
      </div>

      {/* Dates */}
      <div className="mt-3 space-y-1 text-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
          <span className="font-medium text-gray-500">Updated:</span>
          <span className="text-gray-700 font-medium">
            {dayjs(task.updatedAt).format("DD MMM, YYYY [at] hh:mm A")}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
          <span className="font-medium text-gray-500">Created:</span>
          <span className="text-gray-700 font-medium">
            {dayjs(task.createdAt).format("DD MMM, YYYY [at] hh:mm A")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
