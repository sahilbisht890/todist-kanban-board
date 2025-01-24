import React, { useEffect, useState, useRef } from "react";
import {
  ArrowLeftOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import CardView from "./CardView";
import ListView from "./ListView";
import { Button, Segmented , Modal } from "antd";
import { useParams , useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasksList } from "../../store/actions/task";
import AddTaskModal from "./addTaskModal";
import axiosInstance from "../../utils/axios";

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams(); 
  const ProjectName = searchParams.get("name"); 
  const [view, setView] = useState("card");
  const { taskList, taskListLoading } = useSelector((state) => state.tasks);
  const [apiCalled, setApiCalled] = useState(false);
  const [taskListData, setTaskListData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [actionType , setActionType] = useState('create');
  const [taskDetails , setTaskDetails] = useState(null); 
  const [isLoading , setIsLoading] = useState(false);
  const [isDeleteModalVisible , setIsDeleteModalVisible] = useState(false);
  const [deletedTaskId , setDeletedTaskId] = useState(null);


  const handleViewChange = (value) => {
    setView(value);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (!apiCalled) {
      setApiCalled(true);
      dispatch(fetchTasksList(id));
    }
  }, []);

  const handleFetchTaskList = () => {
    dispatch(fetchTasksList(id));
  };

  const handleCreateTask = async (payload) => {
    try {
      payload.boardId = id;
      const response = await axiosInstance.post("/tasks/create", payload);
      handleFetchTaskList();
    } catch (error) {
      console.log("Error while creating task");
    }
  };

  useEffect(() => {
    setTaskListData(taskList);
  }, [taskList]);
 
  const handleOnEdit = (task) => {
       setActionType('edit');
       setTaskDetails(task);
       setIsVisible(true);
  }

  const onClose = () => {
    setIsDeleteModalVisible(false);
    setDeletedTaskId(null);
  }

  const handleOnDelete = (task) => {
      setIsDeleteModalVisible(true);
      setDeletedTaskId(task._id);
  }

  const handleCreate = () => {
    setActionType('create');
    setIsVisible(true);
    setTaskDetails(null);
  }

  const handleDeleteTask = async () => {
    try {
      setIsLoading(true);
       const response = await axiosInstance.delete(`/tasks/delete?taskId=${deletedTaskId}`);
       onClose();
       handleFetchTaskList();
    } catch (error) {
      console.log('Error while deleting task',error);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <>
    <Modal
      title={null}
      open={isDeleteModalVisible}
      onCancel={onClose}
      footer={null}
      className="rounded-lg overflow-hidden relative"
      maskClosable={false}

    >
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-[2000]">
          <div className="loader border-t-4 border-red-600 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      )}
      <div>
          <div className="text-gray-700 text-xl">
              Are you sure you want to delete this task ?
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
                <Button className="border-1 border-gray-600 text-gray-600 bg-white" onClick={onClose}>Cancel</Button>
                <Button className="text-white bg-red-600 hover:scale-105 hover:text-white hover:bg-red-600" onClick={handleDeleteTask}>submit</Button>
          </div>
      </div>
    </Modal>
      
      <AddTaskModal
        visible={isVisible}
        setIsVisible={setIsVisible}
        handleCreateTask={handleCreateTask}
        taskDetails = {taskDetails}
        actionType={actionType}
        handleFetchTaskList={handleFetchTaskList}
      />
      <div className="relative">
        {taskListLoading && (
          <div className="absolute h-screen inset-0 bg-white bg-opacity-60 flex items-center justify-center z-[2000]">
            <div className="loader border-t-4 border-red-600 w-12 h-12 rounded-full animate-spin"></div>
          </div>
        )}
        <div className="px-4 py-4 md:px-8 md:py-4">
          <div className="flex items-center  flex-wrap justify-between mb-4">
            <div className="flex items-center">
              <ArrowLeftOutlined
                className="text-xl cursor-pointer"
                onClick={handleBack}
              />
              <h2 className="text-xl font-bold ml-2">{ProjectName}</h2>
            </div>

            <div className="flex gap-4 items-center sm:mt-2 mt-0 justify-between w-full md:w-auto">
              <button
                className="text-red-700 border-2 border-red-700 p-1 bg-white hover:bg-red-700  hover:text-white text-base rounded-md font-medium  hover:scale-105 transition-all ease-in-out"
                onClick={handleCreate}
              >
                Create Task
              </button>
              <div className="flex space-x-4">
                <Segmented
                  onChange={handleViewChange}
                  value={view}
                  size="large"
                  options={[
                    {
                      label: "List",
                      value: "list",
                      icon: <BarsOutlined />,
                    },
                    {
                      label: "Kanban",
                      value: "card",
                      icon: <AppstoreOutlined />,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
                {
                  !taskListLoading && <div>
                  {view === "card" ? (
                    <CardView
                      tasks={taskListData || []}
                      onEdit = {handleOnEdit}
                      onDelete = {handleOnDelete}
                    />
                  ) : (
                    <ListView
                      tasks={taskListData || []}
                    />
                  )}
                </div>
                }
        </div>
      </div>
    </>
  );
};

export default TaskList;
