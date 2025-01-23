import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import axiosInstance from "../../utils/axios";

const { TextArea } = Input;
const { Option } = Select;

const AddTaskModal = ({
  visible,
  setIsVisible,
  handleCreateTask,
  taskDetails,
  actionType,
  handleFetchTaskList
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
  }, [taskDetails, actionType, form]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      if (actionType === "edit") {
        await handleEditTask({
          ...values,
          dueDate: values.dueDate.format("YYYY-MM-DD"),
        });
      } else {
        await handleCreateTask({
          title: values.title,
          description: values.description || "",
          dueDate: values.dueDate.format("YYYY-MM-DD"),
          priority: values.priority,
        });
      }
      onClose();
    } catch (error) {
      console.error(`Error ${actionType === "edit" ? "editing" : "creating"} task:`,error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTask = async (data) => {
    try {
      const response = await axiosInstance.put( `/tasks/update?taskId=${taskDetails._id}`, data);
      await handleFetchTaskList();
      console.log("Updated Successfully");
    } catch (error) {
      console.error("Error updating task status:", error);
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
    <Modal
      title={
        <div className="text-xl font-bold text-red-600 text-center">
          {actionType === "edit" ? "Edit Task" : "Create Task"}
        </div>
      }
      visible={visible}
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
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          priority: "medium",
        }}
      >
        <Form.Item
          name="title"
          label={<span className="font-semibold">Title</span>}
          rules={[
            { required: true, message: "Please enter the task title!" },
            { max: 50, message: "Title cannot exceed 50 characters." },
          ]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          name="description"
          label={<span className="font-semibold">Description</span>}
          rules={[
            { max: 200, message: "Description cannot exceed 200 characters." },
          ]}
        >
          <TextArea rows={3} placeholder="Enter task description (optional)" />
        </Form.Item>

        <Form.Item
          name="dueDate"
          label={<span className="font-semibold">Due Date</span>}
          rules={[{ required: true, message: "Please select a due date!" }]}
        >
          <DatePicker
            format="DD MMM YYYY"
            disabledDate={disabledDate}
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          name="priority"
          label={<span className="font-semibold">Priority</span>}
          rules={[{ required: true, message: "Please select a priority!" }]}
        >
          <Select placeholder="Select priority">
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>

        {actionType === "edit" && (
          <Form.Item
            name="status"
            label={<span className="font-semibold">Status</span>}
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select placeholder="Select status">
              <Option value="to-do">To-Do</Option>
              <Option value="in-progress">In-Progress</Option>
              <Option value="done">Done</Option>
            </Select>
          </Form.Item>
        )}

        <Form.Item>
          <div className="flex justify-end gap-2">
            <Button
              className="text-red-600 border border-red-600 bg-white hover:scale-105"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-all duration-300"
            >
              {isLoading
                ? "Loading..."
                : actionType === "edit"
                ? "Update Task"
                : "Create Task"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
