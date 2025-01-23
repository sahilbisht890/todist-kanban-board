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

const TaskCard = ({ task, onEdit, onDelete }) => {
  const priorityColor = {
    low: "text-blue-600",
    high: "text-red-600",
    medium: "text-yellow-600",
  };
  const statusColor = {
    "to-do": "text-blue-700",
    "in-progress": "text-yellow-700",
    "done": "text-green-700",
  };
  const priorityIcons = {
    low: <DoubleRightOutlined className="rotate-90 text-blue-600 text-base" />,
    high: <DoubleRightOutlined className="-rotate-90 text-red-600 text-base" />,
    medium: <PauseOutlined className="rotate-90 text-yellow-600 text-base" />,
  };

  const statusIcons = {
    "to-do": <IconListNumbers className="text-blue-600" size={20} />,
    "done": <IconCircleCheckFilled className="text-green-600" size={20} />,
    "in-progress": <IconProgressBolt className="text-yellow-700" size={20} />,
  };
  const keywordsStatus = {
    done: "Done",
    "to-do": "To-Do",
    "in-progress": "In-Progress",
  };



  return (
    <div className="px-4 pt-2 pb-4 border rounded cardShadow bg-gradient-to-r from-red-100 to-red-300">
      <div className="flex justify-end items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <IconClockFilled size={19} className="text-gray-600" />
            <div className="text-sm text-gray-600 font-semibold">
              {dayjs(task.dueDate).format("DD MMM, YYYY")}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <IconEdit
              size={20}
              className="text-blue-600 cursor-pointer hover:scale-110 transition-transform"
              onClick={() => onEdit(task)}
            />
            <IconTrash
              size={20}
              className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
              onClick={() => onDelete(task)}
            />
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-base text-red-600">{task.title}</h3>
      <p className="text-sm text-gray-900">{task.description}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className={`font-bold text-sm text-gray-600`}>Priority :</span>{" "}
        <div className={`flex items-center gap-1`}>
          {priorityIcons[task.priority]}
          <div className={`${priorityColor[task.priority]} text-sm font-semibold`}>
            {task.priority}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-bold text-sm text-gray-600`}>Status :</span>{" "}
        <div className={`flex items-center gap-1`}>
          {statusIcons[task.status]}
          <div className={`${statusColor[task.status]} text-sm font-semibold`}>
            {keywordsStatus[task.status]}
          </div>
        </div>
      </div>
      <div className="flex items-start md:items-center flex-col md:flex-row gap-0 md:gap-2">
        <span className={`font-bold text-sm text-gray-600`}>Updated at :</span>{" "}
        <div className={`flex items-center gap-1`}>
          <div className={`text-sm font-semibold text-gray-700`}>
            {dayjs(task.updatedAt).format("DD MMM, YYYY [at] hh:mm A")}
          </div>
        </div>
      </div>
      <div className="flex items-start md:items-center flex-col md:flex-row gap-0 md:gap-2">
        <span className={`font-bold text-sm text-gray-600`}>Created at :</span>{" "}
        <div className={`flex items-center gap-1`}>
          <div className={`text-sm font-semibold text-gray-700`}>
            {dayjs(task.createdAt).format("DD MMM, YYYY [at] hh:mm A")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
