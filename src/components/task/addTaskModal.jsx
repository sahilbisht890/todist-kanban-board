import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  App,
  ConfigProvider,
} from "antd";
import dayjs from "dayjs";
import axiosInstance from "../../utils/axios";
import Loader from "../common/loader";
import toast from "react-hot-toast";

const { TextArea } = Input;
const { Option } = Select;

const AddTaskModal = ({
  visible,
  setIsVisible,
  handleCreateTask,
  taskDetails,
  actionType,
  handleFetchTaskList,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      if (actionType === "edit" && taskDetails) {
        form.setFieldsValue({
          title: taskDetails.title,
          description: taskDetails.description,
          dueDate: taskDetails.dueDate ? dayjs(taskDetails.dueDate) : null,
          priority: taskDetails.priority || "medium",
          status: taskDetails.status || "to-do",
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          priority: "medium",
        });
      }
    }
  }, [taskDetails, actionType, form, visible]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      if (actionType === "edit") {
        await handleEditTask({
          ...values,
          dueDate: values.dueDate ? values.dueDate.format("YYYY-MM-DD") : null,
        });
      } else {
        await handleCreateTask({
          title: values.title,
          description: values.description || "",
          dueDate: values.dueDate ? values.dueDate.format("YYYY-MM-DD") : null,
          priority: values.priority,
        });
      }
      form.resetFields();
      setIsVisible(false);
    } catch (error) {
      console.error(
        `Error ${actionType === "edit" ? "editing" : "creating"} task:`,
        error,
      );
      toast.error(
        `Failed to ${actionType === "edit" ? "update" : "create"} task`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTask = async (data) => {
    try {
      await axiosInstance.put(`/tasks/update?taskId=${taskDetails._id}`, data);
      await handleFetchTaskList();
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const onClose = () => {
    form.resetFields();
    setIsVisible(false);
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <>
      {isLoading && <Loader />}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "#fff",
              headerBg: "#fff",
              titleColor: "#1f2937",
              titleFontSize: 18,
            },
          },
        }}
      >
        <Modal
          title={actionType === "edit" ? "Edit Task" : "Create New Task"}
          open={visible}
          onCancel={onClose}
          footer={null}
          centered={true} // This ensures the modal is centered
          maskClosable={false}
          width={400}
          classNames={"p-3"}
          styles={{
            header: {
              borderBottom: "1px solid #e5e7eb",
              marginBottom: "16px",
              textAlign: "center",
            },
          }}
          className="rounded-xl shadow-lg"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              priority: "medium",
            }}
            className="space-y-4"
          >
            <Form.Item
              name="title"
              label={<span className="font-medium text-gray-700">Title</span>}
              rules={[
                { required: true, message: "Please enter the task title!" },
                { max: 50, message: "Title cannot exceed 50 characters." },
              ]}
            >
              <Input
                placeholder="Enter task title"
                className="p-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label={
                <span className="font-medium text-gray-700">Description</span>
              }
              rules={[
                {
                  max: 200,
                  message: "Description cannot exceed 200 characters.",
                },
              ]}
            >
              <TextArea
                rows={3}
                placeholder="Enter task description (optional)"
                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </Form.Item>

            <Form.Item
              name="dueDate"
              label={
                <span className="font-medium text-gray-700">Due Date</span>
              }
              rules={[{ required: true, message: "Please select a due date!" }]}
            >
              <DatePicker
                format="DD MMM YYYY"
                disabledDate={disabledDate}
                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400"
                size="large"
                placeholder="Select due date"
              />
            </Form.Item>

            <Form.Item
              name="priority"
              label={
                <span className="font-medium text-gray-700">Priority</span>
              }
              rules={[{ required: true, message: "Please select a priority!" }]}
            >
              <Select
                placeholder="Select priority"
                className="rounded-lg border-gray-300"
                size="large"
              >
                <Option value="low">Low</Option>
                <Option value="medium">Medium</Option>
                <Option value="high">High</Option>
              </Select>
            </Form.Item>

            {actionType === "edit" && (
              <Form.Item
                name="status"
                label={
                  <span className="font-medium text-gray-700">Status</span>
                }
                rules={[{ required: true, message: "Please select a status!" }]}
              >
                <Select
                  placeholder="Select status"
                  className="rounded-lg border-gray-300"
                  size="large"
                >
                  <Option value="to-do">To-Do</Option>
                  <Option value="in-progress">In-Progress</Option>
                  <Option value="done">Done</Option>
                </Select>
              </Form.Item>
            )}

            <Form.Item className="mb-0">
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  onClick={onClose}
                  className="border-gray-300 text-gray-600 hover:text-gray-700 hover:border-gray-400 h-10 font-medium order-2 sm:order-1"
                  size="large"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500 hover:bg-blue-600 border-blue-500 text-white h-10 font-medium order-1 sm:order-2"
                  size="large"
                  loading={isLoading}
                >
                  {actionType === "edit" ? "Update Task" : "Create Task"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default AddTaskModal;
