import React, { useEffect, useState, useCallback } from "react";
import {
  ArrowLeftOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import CardView from "./CardView";
import ListView from "./ListView";
import { Button, Segmented, Modal, App } from "antd";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasksList } from "../../store/actions/task";
import AddTaskModal from "./addTaskModal";
import axiosInstance from "../../utils/axios";
import Loader from "../common/loader";

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const projectName = searchParams.get("name");

  // State management
  const [view, setView] = useState("card");
  const [isVisible, setIsVisible] = useState(false);
  const [actionType, setActionType] = useState("create");
  const [taskDetails, setTaskDetails] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Redux state
  const { taskList, taskListLoading } = useSelector((state) => state.tasks);

  // API call tracking with useRef to prevent unnecessary re-renders
  const apiCalledRef = React.useRef(false);

  // Memoized handlers
  const handleViewChange = useCallback((value) => {
    setView(value);
  }, []);

  const handleBack = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  // Fetch tasks only once
  useEffect(() => {
    if (!apiCalledRef.current) {
      apiCalledRef.current = true;
      dispatch(fetchTasksList(id));
    }
  }, [dispatch, id]);

  const handleFetchTaskList = useCallback(() => {
    dispatch(fetchTasksList(id));
  }, [dispatch, id]);

  const handleCreateTask = useCallback(
    async (payload) => {
      try {
        payload.boardId = id;
        await axiosInstance.post("/tasks/create", payload);
        handleFetchTaskList();
        message.success("Task created successfully!");
      } catch (error) {
        console.error("Error while creating task", error);
        message.error("Failed to create task");
      }
    },
    [id, handleFetchTaskList, message]
  );

  const handleOnEdit = useCallback((task) => {
    setActionType("edit");
    setTaskDetails(task);
    setIsVisible(true);
  }, []);

  const handleOnDelete = useCallback((task) => {
    setTaskToDelete(task);
    setIsDeleteModalVisible(true);
  }, []);

  const handleCreate = useCallback(() => {
    setActionType("create");
    setTaskDetails(null);
    setIsVisible(true);
  }, []);

  const handleDeleteTask = useCallback(async () => {
    if (!taskToDelete) return;

    try {
      await axiosInstance.delete(`/tasks/delete?taskId=${taskToDelete._id}`);
      handleFetchTaskList();
      setIsDeleteModalVisible(false);
      setTaskToDelete(null);
      message.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error while deleting task", error);
      message.error("Failed to delete task");
    }
  }, [taskToDelete, handleFetchTaskList, message]);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(false);
    setTaskToDelete(null);
  }, []);

  // Check if tasks are empty
  const isEmpty = !taskListLoading && (!taskList || taskList.length === 0);

  return (
    <>
      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalVisible}
        onCancel={closeDeleteModal}
        onOk={handleDeleteTask}
        confirmLoading={taskListLoading}
        centered
        title={
          <div className="flex items-center text-gray-900 font-semibold">
            <ExclamationCircleOutlined className="text-red-500 mr-2 text-lg" />
            Confirm Deletion
          </div>
        }
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          className:
            "bg-red-500 border-none hover:bg-red-600 focus:bg-red-700 font-medium rounded-md shadow-sm transition-colors",
        }}
        cancelButtonProps={{
          className:
            "bg-gray-100 hover:bg-gray-200 focus:bg-gray-300 text-gray-700 font-medium rounded-md shadow-sm transition-colors",
        }}
        bodyStyle={{ borderTop: "1px solid #f0f0f0", paddingTop: "1.5rem" }}
      >
        <div className="text-gray-700 leading-relaxed">
          Are you sure you want to permanently delete{" "}
          <span className="font-semibold text-gray-900">
            {taskToDelete?.title}
          </span>
          ? <br /> This action <span className="text-red-500">cannot</span> be
          undone.
        </div>
      </Modal>

      {/* Add/Edit Task Modal */}
      <AddTaskModal
        visible={isVisible}
        setIsVisible={setIsVisible}
        handleCreateTask={handleCreateTask}
        taskDetails={taskDetails}
        actionType={actionType}
        handleFetchTaskList={handleFetchTaskList}
      />

      <div className="relative mt-16 px-4 max-w-7xl mx-auto">
        {taskListLoading && <Loader message="Loading tasks..." />}

        <div className="px-4 py-6 md:px-6">
          {/* Header Section - Always show header even when empty */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-blue-600 mr-3"
              >
                Back
              </Button>
              <h2 className="text-2xl font-bold text-gray-800 truncate max-w-xs md:max-w-md">
                {projectName}
              </h2>
            </div>

            {!isEmpty && (
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <Button
                  type="primary"
                  onClick={handleCreate}
                  className="bg-blue-500 hover:bg-blue-600 border-blue-500 h-10 font-medium whitespace-nowrap"
                  size="middle"
                >
                  Create Task
                </Button>

                <Segmented
                  onChange={handleViewChange}
                  value={view}
                  size="middle"
                  options={[
                    {
                      label: (
                        <span className="flex items-center">
                          <BarsOutlined className="mr-1" /> List
                        </span>
                      ),
                      value: "list",
                    },
                    {
                      label: (
                        <span className="flex items-center">
                          <AppstoreOutlined className="mr-1" /> Kanban
                        </span>
                      ),
                      value: "card",
                    },
                  ]}
                  className="bg-gray-100 rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Content Section */}
          {isEmpty ? (
            // Empty state - show only when no tasks available
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarsOutlined className="text-gray-500 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by creating your first task
              </p>
              <Button
                type="primary"
                onClick={handleCreate}
                className="bg-blue-500 hover:bg-blue-600"
                size="middle"
              >
                Create Your First Task
              </Button>
            </div>
          ) : (
            // Show tasks when available
            <div className="min-h-[400px]">
              {view === "card" ? (
                <CardView
                  tasks={taskList || []}
                  onEdit={handleOnEdit}
                  onDelete={handleOnDelete}
                />
              ) : (
                <ListView
                  tasks={taskList || []}
                  handleFetchTaskList={handleFetchTaskList}
                  onEdit={handleOnEdit}
                  onDelete={handleOnDelete}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskList;
